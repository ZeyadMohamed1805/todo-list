import * as yup from 'yup';

const RegisterSchema = yup.object({
  username: yup.string().required("username_required").min(8, 'username_min_length'),
  email: yup.string().email('invalid_email').required('email_required'),
  password: yup.string().required('password_required').min(8, 'password_min_length'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password')], 'password_mismatch')
    .required('confirm_password_required'),
});

export default RegisterSchema;
