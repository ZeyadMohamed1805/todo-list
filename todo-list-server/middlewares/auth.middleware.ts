import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnAuthorizedError } from '../errors/unAuthorized';
import { AuthorizedRequest } from '../types/requests.types';
import { StatusCodesEnum } from '../enums/statusCodes.enum';
import { JWT_SECRET } from '../features/auth/auth.config';

export const authenticateUser = async (request: Request, response: Response, next: NextFunction): Promise<any> => {
    const token = request.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new UnAuthorizedError();
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

        (request as AuthorizedRequest).userId = decoded.userId;
        next();
    } catch (error) {
        throw new UnAuthorizedError();
    }
};
