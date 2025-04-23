import bcrypt from "bcryptjs";
import prisma from "../../prisma";
import { UserAlreadyExistsError } from "./auth.errors";
import { LoginSchema, RegisterSchema } from "./auth.types";

export const registerUser = async (data: RegisterSchema) => {
    const { username, email, password } = data;

    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [{ username }, { email }],
        },
    });

    if (existingUser) {
        throw new UserAlreadyExistsError();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const registeredUser = await prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
        },
    });

    return {
        id: registeredUser.id,
        username: registeredUser.username,
        email: registeredUser.email,
        createdAt: registeredUser.createdAt,
    };
};

export const loginUser = async ({ email, password }: LoginSchema) => {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        throw new Error("auth.invalid_credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        throw new Error("auth.invalid_credentials");
    }

    return user;
};