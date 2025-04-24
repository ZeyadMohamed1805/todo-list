import { Request, Response } from "express";
import { AuthorizedRequest } from "../../types/requests.types";
import prisma from "../../prisma";
import { InvalidTaskDataError, TaskNotFoundError, TaskTitleIsRequiredError, TodoListNotFoundError } from "./tasks.errors";
import { StatusCodesEnum } from "../../enums/statusCodes.enum";
import { UnAuthorizedError } from "../../errors/unAuthorized";

export const getTasksByTodoListId = async (request: Request, response: Response) => {
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

export const createTodoListTask = async (request: Request, response: Response) => {
    const { userId, body: { title }, params: { todoListId } } = request as AuthorizedRequest;

    if (!title || title.trim() === "") {
        throw new TaskTitleIsRequiredError();
    }

    const todoList = await prisma.todoList.findFirst({
        where: {
            id: todoListId,
            userId,
        },
    });

    if (!todoList) {
        throw new TodoListNotFoundError();
    }

    const newTask = await prisma.task.create({
        data: {
            title,
            todoListId,
        },
    });

    const [totalTasksCount, completedTasksCount] = await Promise.all([
        prisma.task.count({ where: { todoListId } }),
        prisma.task.count({ where: { todoListId, isCompleted: true } }),
    ]);

    const progress = totalTasksCount === 0 ? 0 : Math.round((completedTasksCount / totalTasksCount) * 100);

    await prisma.todoList.update({
        where: { id: todoListId },
        data: {
            totalTasksCount,
            progress,
        },
    });

    response.status(StatusCodesEnum.CREATED).json(newTask);
};

export const patchTodoListTask = async (request: Request, response: Response) => {
    try {
        const { userId, params: { taskId }, body } = request as AuthorizedRequest;

        const task = await prisma.task.findUnique({
            where: { id: taskId },
            include: { todoList: true },
        });

        if (!task) {
            throw new TaskNotFoundError();
        }

        if (task.todoList.userId !== userId) {
            throw new UnAuthorizedError();
        }

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: body,
        });

        if (typeof body.isCompleted === 'boolean') {
            const [totalTasksCount, completedTasksCount] = await Promise.all([
                prisma.task.count({ where: { todoListId: task.todoListId } }),
                prisma.task.count({ where: { todoListId: task.todoListId, isCompleted: true } }),
            ]);

            const progress = totalTasksCount === 0 ? 0 : Math.round((completedTasksCount / totalTasksCount) * 100);

            await prisma.todoList.update({
                where: { id: task.todoListId },
                data: {
                    completedTasksCount,
                    progress,
                },
            });
        }

        response.status(StatusCodesEnum.OK).json({ success: true, data: updatedTask });
    } catch (error) {
        throw new InvalidTaskDataError();
    }
};

export const deleteTodoListTask = async (request: Request, response: Response) => {
    const { userId, params: { taskId } } = request as AuthorizedRequest;

    const task = await prisma.task.findUnique({
        where: { id: taskId },
        include: { todoList: true },
    });

    if (!task) {
        throw new TaskNotFoundError();
    }

    if (task.todoList.userId !== userId) {
        throw new UnAuthorizedError();
    }

    await prisma.task.delete({ where: { id: taskId } });

    response.status(StatusCodesEnum.OK).json({ success: true });
};