export class TodoListTitleIsRequiredError extends Error {
    constructor() {
        super("title_required");
        this.name = "TodoListTitleIsRequiredError";
    }
}

export class TodoListNotFoundError extends Error {
    constructor() {
        super("todo_list_not_found");
        this.name = "TodoListNotFoundError";
    }
}

export class NoFileUploadedError extends Error {
    constructor() {
        super("no_file_uploaded");
        this.name = "NoFileUploadedError";
    }
}