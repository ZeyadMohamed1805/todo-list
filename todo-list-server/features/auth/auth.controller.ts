import { Request, Response, NextFunction } from "express";
import { registerUser } from "./auth.service";

export const register = async (request: Request, response: Response, next: NextFunction) => {
    try {
        await registerUser(request.body);
        response.status(204).json({ success: true });
    } catch (error) {
        next(error);
    }
};
