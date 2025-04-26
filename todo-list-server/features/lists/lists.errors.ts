import { StatusCodesEnum } from "../../enums/statusCodes.enum";
import { CustomError } from "../../errors/customError";

export class TodoListTitleIsRequiredError extends CustomError {
    constructor() {
        super(
            "TodoListTitleIsRequiredError", 
            "title_required", 
            StatusCodesEnum.BAD_REQUEST
        );
    }
}

export class TodoListNotFoundError extends CustomError {
    constructor() {
        super(
            "TodoListNotFoundError", 
            "todo_list_not_found", 
            StatusCodesEnum.NOT_FOUND
        );
    }
}

export class NoFileUploadedError extends CustomError {
    constructor() {
        super(
            "NoFileUploadedError", 
            "no_file_uploaded", 
            StatusCodesEnum.BAD_REQUEST
        );
    }
}