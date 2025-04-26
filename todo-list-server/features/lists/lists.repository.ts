import { TodoList } from "@prisma/client";
import prisma from "../../prisma";

export const getListsByUserId = async (userId: number) => {
    return await prisma.todoList.findMany({
        where: {
            userId,
        },
    });
}

export const getUserListById = async (userId: number, todoListId: string) => {
    return await prisma.todoList.findFirst({
        where: {
            id: todoListId,
            userId,
        },
    });
}

export const createUserListByTitle = async (userId: number, title: string) => {
    return await prisma.todoList.create({
        data: {
            title,
            userId,
        },
    });
}

export const findUserListById = async (todoListId: string) => {
    return await prisma.todoList.findUnique({
        where: {
            id: todoListId,
        },
    });
}

export const deleteTasksByUserListId = async (todoListId: string) => {
    return await prisma.task.deleteMany({
        where: {
            todoListId,
        },
    });
}

export const deleteUserListById = async (todoListId: string) => {
    return await prisma.todoList.delete({
        where: {
            id: todoListId,
        },
    });
}

export const updateUserListById = async (todoListId: string, data: Partial<TodoList>) => {
    return await prisma.todoList.update({
        where: {
            id: todoListId,
        },
        data,
    });
}