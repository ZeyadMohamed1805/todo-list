import { Request, Response, NextFunction } from "express";
import { AnyObject, Maybe, ObjectSchema } from "yup";
import { ValidationError } from "../types/error.type";

const validate = (schema: ObjectSchema<Maybe<AnyObject>>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
            return next();
        } catch (error) {
            res.status(400).json({
                errors: error.inner.map((error: ValidationError) => ({
                    field: error.path,
                    key: error.message,
                })),
            });
        }
    };
};

export default validate;
