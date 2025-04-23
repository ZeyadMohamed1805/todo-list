import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "yup";

const validate = (schema: ObjectSchema<any>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
            return next();
        } catch (error: any) {
            res.status(400).json({
                errors: error.inner.map((e: any) => ({
                    field: e.path,
                    key: e.message,
                })),
            });
        }
    };
};

export default validate;
