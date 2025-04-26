import { Request, Response } from "express";
import { AuthorizedRequest } from "../../types/requests.types";
import fs from 'fs';
import { StatusCodesEnum } from "../../enums/statusCodes.enum";
import { NoFileUploadedError, TodoListNotFoundError, TodoListTitleIsRequiredError } from "./lists.errors";
import { createUserList, deleteUserList, getUserList, getUserLists, saveUserListIcon } from "./lists.service";

export const getTodoLists = async (request: Request, response: Response): Promise<void> => {
    const userId = (request as AuthorizedRequest).userId;

    const todoLists = await getUserLists(userId);

    response.status(StatusCodesEnum.OK).json({ success: true, data: todoLists });
};

export const getTodoListById = async (request: Request, response: Response): Promise<void> => {
    const { userId, params: { todoListId } } = (request as AuthorizedRequest);

    const todoList = await getUserList(userId, todoListId);

    response.status(StatusCodesEnum.OK).json({ success: true, data: todoList });
};


export const createTodoList = async (request: Request, response: Response): Promise<void> => {
    const { userId, body: { title } } = request as AuthorizedRequest;

    if (!title) {
        throw new TodoListTitleIsRequiredError();
    }

    const newTodoList = await createUserList(userId, title);

    response.status(StatusCodesEnum.CREATED).json({ success: true, data: newTodoList });
};

export const deleteTodoList = async (request: Request, response: Response): Promise<void> => {
    const { userId, params: { todoListId } } = request as AuthorizedRequest;

    await deleteUserList(userId, todoListId);

    response.status(StatusCodesEnum.OK).json({ success: true, data: [] });
};


export const uploadTodoListIcon = async (request: Request, response: Response): Promise<void> => {
    const { userId, params: { todoListId }, file } = request as AuthorizedRequest;

    if (!file) {
        throw new NoFileUploadedError();
    }

    const todoList = await getUserList(userId, todoListId);

    if (!todoList) {
        throw new TodoListNotFoundError();
    }

    if (todoList.imagePath && fs.existsSync(todoList.imagePath)) {
        fs.unlinkSync(todoList.imagePath);
    }

    const updatedTodoList = await saveUserListIcon(todoList, file);

    response.json({ success: true, todoList: updatedTodoList });
}