import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Error } from "../types/error.type";

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof ZodError) {
        return response.status(400).json({
            success: false,
            errors: error.errors,
        });
    }

    const statusCode = error.status || 500;
    
    response.status(statusCode).json({
        success: false,
        message: error.message || "something_went_wrong",
    });
};

export default errorHandler;
