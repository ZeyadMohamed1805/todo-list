import * as yup from "yup";
import { registerSchema } from "./auth.schema";

export type RegisterSchema = yup.InferType<typeof registerSchema>;