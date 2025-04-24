export class TodoListNotFoundError extends Error {
    constructor() {
        super("todo_list_not_found");
        this.name = "TodoListNotFoundError";
    }
}

export class TaskTitleIsRequiredError extends Error {
    constructor() {
        super("title_required");
        this.name = "TaskTitleIsRequiredError";
    }
}