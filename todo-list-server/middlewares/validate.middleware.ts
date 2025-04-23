import { Request, Response, NextFunction } from "express";
import { AnyObject, Maybe, ObjectSchema, ValidationError as YupValidationError } from "yup";
import { StatusCodesEnum } from "../enums/statusCodes.enum";

const validate = (schema: ObjectSchema<Maybe<AnyObject>>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
            return next();
        } catch (error) {
            if (error instanceof YupValidationError) {
                res.status(StatusCodesEnum.BAD_REQUEST).json({
                    errors: error.inner.map(err => ({
                        field: err.path,
                        key: err.message,
                    })),
                });
            } else {
                next(error);
            }
        }
    };
};

export default validate;
