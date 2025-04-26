import prisma from "../../prisma";

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email } });
}

export const getUserByUsernameOrEmail = async (username: string | undefined, email: string | undefined) => {
    return await prisma.user.findFirst({
        where: {
            OR: [
                { username },
                { email },
            ],
        },
    });
}

export const createUser = async (username: string, email: string, password: string) => {
    return await prisma.user.create({
        data: {
            username,
            email,
            password,
        },
    });
}