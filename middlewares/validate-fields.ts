import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { Middleware } from "express-validator/src/base";

export const validateFields:Middleware = (req: any, res: Response, next: NextFunction) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();
};

