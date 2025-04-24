export class SomethingWentWrongError extends Error {
    constructor() {
        super("something_went_wrong");
        this.name = "SomethingWentWrongError";
    }
}