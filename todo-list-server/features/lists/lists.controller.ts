import { Request, Response } from "express";
import { AuthorizedRequest } from "../../types/requests.types";
import prisma from "../../prisma";
import { StatusCodesEnum } from "../../enums/statusCodes.enum";
import { TodoListNotFoundError, TodoListTitleIsRequiredError } from "./lists.errors";

export const getTodoLists = async (request: Request, response: Response): Promise<void> => {
    const userId = (request as AuthorizedRequest).userId;

    const todoLists = await prisma.todoList.findMany({
        where: { userId },
        select: {
            id: true,
            title: true,
            progress: true,
            status: true
        },
    });

    response.status(StatusCodesEnum.OK).json({ success: true, data: todoLists });
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

    response.status(StatusCodesEnum.CREATED).json({ status: true, data: newTodoList });
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