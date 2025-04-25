import { Request, Response } from "express";
import { AuthorizedRequest } from "../../types/requests.types";
import fs from 'fs';
import prisma from "../../prisma";
import { StatusCodesEnum } from "../../enums/statusCodes.enum";
import { NoFileUploadedError, TodoListNotFoundError, TodoListTitleIsRequiredError } from "./lists.errors";

export const getTodoLists = async (request: Request, response: Response): Promise<void> => {
    const userId = (request as AuthorizedRequest).userId;

    const todoLists = await prisma.todoList.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
            progress: true,
            imagePath: true
        },
    });

    response.status(StatusCodesEnum.OK).json({ success: true, data: todoLists });
};

export const getTodoListById = async (request: Request, response: Response): Promise<void> => {
    const { userId, params: { todoListId } } = (request as AuthorizedRequest);

    const todoList = await prisma.todoList.findFirst({
        where: {
            id: todoListId,
            userId,
        },
    });

    if (!todoList) {
        throw new TodoListNotFoundError();
    }

    response.status(StatusCodesEnum.OK).json({ success: true, data: todoList });
};


export const createTodoList = async (request: Request, response: Response): Promise<void> => {
    const { userId, body: { title } } = request as AuthorizedRequest;

    if (!title) {
        throw new TodoListTitleIsRequiredError();
    }

    const newTodoList = await prisma.todoList.create({
        data: {
            title,
            userId,
        },
    });

    response.status(StatusCodesEnum.CREATED).json({ success: true, data: newTodoList });
};

export const deleteTodoList = async (request: Request, response: Response): Promise<void> => {
    const { userId, params: { todoListId } } = (request as AuthorizedRequest);

    const list = await prisma.todoList.findUnique({
        where: { id: todoListId },
    });

    if (!list || list.userId !== userId) {
        throw new TodoListNotFoundError();
    }

    await prisma.todoList.delete({
        where: { id: todoListId },
    });

    response.status(StatusCodesEnum.OK).json({ success: true, data: [] });
}

export const uploadTodoListIcon = async (request: Request, response: Response): Promise<void> => {
    const { params: { todoListId }, file } = request;

    if (!file) {
        console.log("here");
        
        throw new NoFileUploadedError();
    }

    const todoList = await prisma.todoList.findUnique({ where: { id: todoListId } });

    if (!todoList) {
        throw new TodoListNotFoundError();
    }

    if (todoList.imagePath && fs.existsSync(todoList.imagePath)) {
        fs.unlinkSync(todoList.imagePath);
    }

    const imagePath = `uploads/todo-icons/${file.filename}`;

    const updatedTodoList = await prisma.todoList.update({
        where: { id: todoListId },
        data: { imagePath },
    });

    response.json({ success: true, todoList: updatedTodoList });
}