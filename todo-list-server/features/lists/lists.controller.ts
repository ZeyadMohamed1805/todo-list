import { Request, Response } from "express";
import { AuthorizedRequest } from "../../types/requests.types";
import prisma from "../../prisma";
import { StatusCodesEnum } from "../../enums/statusCodes.enum";

export const getTodoLists = async (request: Request, response: Response): Promise<any> => {
    try {
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

        response.json(todoLists);
    } catch (error) {
        response.status(StatusCodesEnum.INTERNAL_SERVER_ERROR).json({ error: 'something_went_wrong' });
    }
};
