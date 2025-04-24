import * as yup from 'yup';
import RegisterSchema from './Register.schema';

export type TRegisterData = yup.InferType<typeof RegisterSchema>;