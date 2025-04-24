export class UserAlreadyExistsError extends Error {
    constructor() {
        super("user_already_exists");
        this.name = "UserAlreadyExistsError";
    }
}

export class UserInvalidCredentialsError extends Error {
    constructor() {
        super("invalid_credentials");
        this.name = "UserInvalidCredentials";
    }
}