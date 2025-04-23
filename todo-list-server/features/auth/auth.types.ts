import * as yup from "yup";
import { registerSchema, loginSchema } from "./auth.schema";

export type RegisterSchema = yup.InferType<typeof registerSchema>;
export type LoginSchema = yup.InferType<typeof loginSchema>;