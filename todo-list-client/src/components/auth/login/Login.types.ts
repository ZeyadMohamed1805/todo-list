import * as yup from 'yup';
import { LoginSchema } from './Login.schema';

export type TLoginData = yup.InferType<typeof LoginSchema>;

export type TLoginResponse = {
    user?: {
        username: string;
    };
};