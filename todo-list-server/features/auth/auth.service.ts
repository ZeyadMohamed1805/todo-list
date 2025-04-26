import bcrypt from "bcryptjs";
import prisma from "../../prisma";
import { UserAlreadyExistsError, UserInvalidCredentialsError } from "./auth.errors";
import { LoginSchema, RegisterSchema } from "./auth.types";
import { createUser, getUserByEmail, getUserByUsernameOrEmail } from "./auth.repository";

export const registerUser = async (data: RegisterSchema) => {
    const { username, email, password } = data;

    const existingUser = await getUserByUsernameOrEmail(username, email);

    if (existingUser) {
        throw new UserAlreadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const registeredUser = await createUser(username, email, hashedPassword);

    return {
        id: registeredUser.id,
        username: registeredUser.username,
        email: registeredUser.email,
        createdAt: registeredUser.createdAt,
    };
};

export const loginUser = async ({ email, password }: LoginSchema) => {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new UserInvalidCredentialsError();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        throw new UserInvalidCredentialsError();
    }

    return user;
};