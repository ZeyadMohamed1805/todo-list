import { StatusCodesEnum } from "../enums/statusCodes.enum";
import { CustomError } from "./customError";

export class SomethingWentWrongError extends CustomError {
    constructor() {
        super(
            "SomethingWentWrongError", 
            "something_went_wrong",
            StatusCodesEnum.INTERNAL_SERVER_ERROR, 
        );
    }
}