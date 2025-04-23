import { Request, Response, NextFunction } from "express";
import { registerUser } from "./auth.service";
import { StatusCodesEnum } from "../../enums/statusCodes.enum";

export const register = async (request: Request, response: Response, next: NextFunction) => {
    try {
        await registerUser(request.body);
        response.status(StatusCodesEnum.NO_CONTENT).json({ success: true });
    } catch (error) {
        next(error);
    }
};
