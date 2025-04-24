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
    const {
        userId,
        body: { title },
        params: { todoListId },
    } = request as AuthorizedRequest;

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

    const updatedTotal = todoList.totalTasksCount + 1;
    const progress = updatedTotal === 0
        ? 0
        : Math.round((todoList.completedTasksCount / updatedTotal) * 100);

    await prisma.todoList.update({
        where: { id: todoListId },
        data: {
            totalTasksCount: updatedTotal,
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

        const wasCompleted = task.isCompleted;
        const willBeCompleted = body.isCompleted;

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: body,
        });

        if (typeof willBeCompleted === 'boolean' && wasCompleted !== willBeCompleted) {
            const adjustment = willBeCompleted ? 1 : -1;
            const newCompletedCount = task.todoList.completedTasksCount + adjustment;

            const progress = task.todoList.totalTasksCount === 0
                ? 0
                : Math.round((newCompletedCount / task.todoList.totalTasksCount) * 100);

            await prisma.todoList.update({
                where: { id: task.todoListId },
                data: {
                    completedTasksCount: newCompletedCount,
                    progress,
                },
            });
        }

        response.status(StatusCodesEnum.OK).json({ success: true, data: updatedTask });
    } catch (error) {
        console.error(error);
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

    const todoList = task.todoList;
    const wasCompleted = task.isCompleted;

    await prisma.task.delete({ where: { id: taskId } });

    const newTotal = todoList.totalTasksCount - 1;
    const newCompleted = wasCompleted ? todoList.completedTasksCount - 1 : todoList.completedTasksCount;
    const progress = newTotal === 0 ? 0 : Math.round((newCompleted / newTotal) * 100);

    await prisma.todoList.update({
        where: { id: todoList.id },
        data: {
            totalTasksCount: newTotal,
            completedTasksCount: newCompleted,
            progress,
        },
    });

    response.status(StatusCodesEnum.OK).json({ success: true });
};