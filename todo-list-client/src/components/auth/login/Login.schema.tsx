import * as yup from "yup";

export const LoginSchema = yup.object({
    email: yup
        .string()
        .email("invalid_email")
        .required("email_required"),
    password: yup
        .string()
        .required("password_required")
        .min(8, "password_min_length"),
});