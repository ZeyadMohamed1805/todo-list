import fs from "fs";
import { TodoList } from "@prisma/client";
import { TodoListNotFoundError } from "./lists.errors";
import { createUserListByTitle, deleteTasksByUserListId, deleteUserListById, findUserListById, getListsByUserId, getUserListById, updateUserListById } from "./lists.repository";

export const getUserLists = async (userId: number) => {
    return await getListsByUserId(userId);
}

export const getUserList = async (userId: number, todoListId: string) => {
    const userList = await getUserListById(userId, todoListId);

    if (!userList) {
        throw new TodoListNotFoundError();
    }

    return userList;
}

export const createUserList = async (userId: number, title: string) => {
    return await createUserListByTitle(userId, title);
}

export const deleteUserList = async (userId: number, todoListId: string) => {
    const list = await findUserListById(todoListId);

    if (!list || list.userId !== userId) {
        throw new TodoListNotFoundError();
    }

    await deleteTasksByUserListId(todoListId);

    return await deleteUserListById(todoListId);
}

export const saveUserListIcon = async (todoList: TodoList, imageFile: Express.Multer.File) => {
    if (todoList.imagePath && fs.existsSync(todoList.imagePath)) {
            fs.unlinkSync(todoList.imagePath);
        }
    
    const imagePath = `${process.env.UPLOADS_DIR}/todo-icons/${imageFile.filename}`;

    return await updateUserListById(todoList.id, {
        imagePath
    });
}