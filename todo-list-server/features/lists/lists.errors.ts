export class TodoListTitleIsRequiredError extends Error {
    constructor() {
        super("title_required");
        this.name = "TodoListTitleIsRequiredError";
    }
}