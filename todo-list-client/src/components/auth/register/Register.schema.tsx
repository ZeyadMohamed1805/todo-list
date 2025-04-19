import * as yup from "yup";

const RegisterSchema = yup.object({
    email: yup
        .string()
        .email("invalid_email")
        .required("email_required"),
    password: yup
        .string()
        .required("password_required")
        .min(8, "password_min_length"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password")], "password_mismatch")
        .required("confirm_password_required"),
});

export default RegisterSchema;