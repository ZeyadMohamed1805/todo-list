import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./auth.config";

export const signToken = (payload: object, expiresIn: number) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn });
};
