import { StatusCodesEnum } from "../enums/statusCodes.enum";
import { CustomError } from "./customError";

export class UnAuthorizedError extends CustomError {
    constructor() {
        super(
            "UnAuthorizedError", 
            "unauthorized", 
            StatusCodesEnum.UNAUTHORIZED
        );
    }
}