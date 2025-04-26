import { Request, Response } from "express";
import { AuthorizedRequest } from "../../types/requests.types";
import { TaskTitleIsRequiredError } from "./tasks.errors";
import { StatusCodesEnum } from "../../enums/statusCodes.enum";
import { createTask, deleteTask, getListTasks, updateTask } from "./tasks.service";

export const getTasksByTodoListId = async (request: Request, response: Response) => {
    const { userId, params: { todoListId } } = (request as AuthorizedRequest);

    const tasks = await getListTasks(userId, todoListId);

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

    await createTask(userId, todoListId, title);

    response.status(StatusCodesEnum.CREATED).json({ success: true });
};


export const patchTodoListTask = async (request: Request, response: Response) => {
    const { userId, params: { taskId }, body } = request as AuthorizedRequest;

    const updatedTask = await updateTask(userId, taskId, body);

    response.status(StatusCodesEnum.OK).json({ success: true, data: updatedTask });
};

export const deleteTodoListTask = async (request: Request, response: Response) => {
    const { userId, params: { taskId } } = request as AuthorizedRequest;

    const deletedTask = await deleteTask(userId, taskId);

    response.status(StatusCodesEnum.OK).json({ success: true, date: deletedTask });
};
