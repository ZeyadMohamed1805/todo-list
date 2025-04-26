import { StatusCodesEnum } from "../../enums/statusCodes.enum";
import { CustomError } from "../../errors/customError";

export class TodoListNotFoundError extends CustomError {
    constructor() {
        super(
            "TodoListNotFoundError", 
            "todo_list_not_found", 
            StatusCodesEnum.NOT_FOUND
        );
    }
}

export class TaskTitleIsRequiredError extends CustomError {
    constructor() {
        super(
            "TaskTitleIsRequiredError", 
            "title_required", 
            StatusCodesEnum.BAD_REQUEST
        );
    }
}

export class TaskNotFoundError extends CustomError {
    constructor() {
        super(
            "TaskNotFoundError", 
            "task_not_found", 
            StatusCodesEnum.NOT_FOUND
        );
    }
}

export class InvalidTaskDataError extends CustomError {
    constructor() {
        super(
            "InvalidTaskDataError", 
            "invalid_task_data", 
            StatusCodesEnum.BAD_REQUEST
        );
    }
}