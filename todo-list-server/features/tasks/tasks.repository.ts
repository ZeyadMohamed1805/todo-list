import { Prisma } from "@prisma/client";
import prisma from "../../prisma";
import { Task } from "./tasks.type";

export const getTasksByListId = async (todoListId: string) => {
    return await prisma.task.findMany({
        where: {
            todoListId,
        },
        orderBy: {
            order: "asc",
        },
    });
}

export const getLastTaskInList = async (todoListId: string) => {
    return await prisma.task.findFirst({
        where: {
            todoListId,
        },
        orderBy: {
            order: "desc",
        },
    });
}

export const createListTask = async (todoListId: string, title: string, order: number) => {
    return await prisma.task.create({
        data: {
            title,
            todoListId,
            order
        },
    });
}

export const updateTaskById = async (taskId: string, data: Partial<Task>) => {
    return await prisma.task.update({
        where: { id: taskId },
        data: data,
    });
}

export const updateTaskForTransaction = (taskId: string, data: Partial<Task>) => {
    return prisma.task.update({
        where: { id: taskId },
        data: data,
    });
}

export const getTaskById = async (taskId: string) => {
    return await prisma.task.findUnique({
        where: { id: taskId },
        include: { todoList: true },
    });
}

export const transactTaskQueries = async <T>(queries: Prisma.PrismaPromise<T>[]): Promise<T[]> => {
    return await prisma.$transaction(queries);
}

export const deleteTaskById = async (taskId: string) => {
    return await prisma.task.delete({
        where: { id: taskId },
    });
}