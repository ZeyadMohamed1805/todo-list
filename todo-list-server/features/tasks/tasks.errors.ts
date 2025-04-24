export class TodoListNotFoundError extends Error {
    constructor() {
        super("todo_list_not_found");
        this.name = "TodoListNotFoundError";
    }
}