import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "./auth.service";
import { StatusCodesEnum } from "../../enums/statusCodes.enum";
import { loginSchema } from "./auth.schema";
import { signToken } from "./auth.utils";
import { JWT_EXPIRES_IN } from "./auth.config";

export const register = async (request: Request, response: Response, next: NextFunction) => {
    try {
        await registerUser(request.body);
        response.status(StatusCodesEnum.NO_CONTENT).json({ success: true });
    } catch (error) {
        next(error);
    }
};

export const login = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email, password, rememberMe } = await loginSchema.validate(request.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        const user = await loginUser({ email, password, rememberMe });

        const expiresIn = rememberMe ? JWT_EXPIRES_IN.rememberMe : JWT_EXPIRES_IN.standard;
        const token = signToken({ userId: user.id }, expiresIn);

        response.status(StatusCodesEnum.OK).json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            token,
        });
    } catch (error) {
        next(error);
    }
};