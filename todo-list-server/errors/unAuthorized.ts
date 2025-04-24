export class UnAuthorizedError extends Error {
    constructor() {
        super("unauthorized");
        this.name = "UnAuthorizedError";
    }
}