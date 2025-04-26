import { StatusCodesEnum } from "../../enums/statusCodes.enum";
import { CustomError } from "../../errors/customError";

export class UserAlreadyExistsError extends CustomError {
    constructor() {
        super(
            "UserAlreadyExistsError", 
            "user_already_exists", 
            StatusCodesEnum.BAD_REQUEST
        );
    }
}

export class UserInvalidCredentialsError extends CustomError {
    constructor() {
        super(
            "UserInvalidCredentials", 
            "invalid_credentials", 
            StatusCodesEnum.NOT_FOUND
        );
    }
}