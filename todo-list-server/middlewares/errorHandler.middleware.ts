import { Request, Response, NextFunction } from "express";
import { Error } from "../types/error.type";
import { StatusCodesEnum } from "../enums/statusCodes.enum";

const errorHandler = (error: Error, request: Request, response: Response, next: NextFunction) => {
    const statusCode = error.status || StatusCodesEnum.INTERNAL_SERVER_ERROR;
    
    response.status(statusCode).json({
        success: false,
        message: "something_went_wrong",
    });
};

export default errorHandler;
