export class UserAlreadyExistsError extends Error {
    constructor() {
        super("user_already_exists");
        this.name = "UserAlreadyExistsError";
    }
}

export class UserRegistrationFailed extends Error {
    constructor() {
        super("user_registration_failed");
        this.name = "UserRegistrationFailed";
    }
}