import { Request, Response } from "express";
import { AuthorizedRequest } from "../../types/requests.types";
import prisma from "../../prisma";
import { TodoListNotFoundError } from "./tasks.errors";
import { StatusCodesEnum } from "../../enums/statusCodes.enum";

export const getTasksByTodoListId = async (request: Request, response: Response): Promise<void> => {
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

    const tasks = await prisma.task.findMany({
        where: {
            todoListId,
        },
        orderBy: {
            createdAt: "asc",
        },
    });

    response.status(StatusCodesEnum.OK).json({ success: true, data: tasks });
};
