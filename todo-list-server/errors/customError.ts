import { StatusCodesEnum } from "../enums/statusCodes.enum";

export class CustomError extends Error {
    status: StatusCodesEnum;

    constructor(
        name: string = "SomethingWentWrongError", 
        message: string = "something_went_wrong", 
        status: StatusCodesEnum = StatusCodesEnum.INTERNAL_SERVER_ERROR
    ) {
        super(message);
        this.name = name;
        this.status = status;
    }
}