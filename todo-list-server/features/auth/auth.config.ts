import { ONE_HOUR, SEVEN_DAYS } from "./auth.constants";

export const JWT_SECRET = process.env.JWT_SECRET || "secret_key";
export const JWT_EXPIRES_IN = {
    standard: process.env.JWT_TOKEN_EXPIRATION ? parseInt(process.env.JWT_TOKEN_EXPIRATION) : ONE_HOUR,
    rememberMe: process.env.JWT_REMEMBER_ME_EXPIRATION ? parseInt(process.env.JWT_REMEMBER_ME_EXPIRATION) : SEVEN_DAYS,
};
