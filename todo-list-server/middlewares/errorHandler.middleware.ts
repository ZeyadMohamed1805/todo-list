import { Request, Response, NextFunction } from "express";
import { Error } from "../types/error.type";

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    const statusCode = error.status || 500;
    
    response.status(statusCode).json({
        success: false,
        message: error.message || "something_went_wrong",
    });
};

export default errorHandler;
