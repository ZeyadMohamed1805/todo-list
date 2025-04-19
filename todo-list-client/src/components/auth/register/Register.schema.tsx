import * as yup from "yup";

const RegisterSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export default RegisterSchema;