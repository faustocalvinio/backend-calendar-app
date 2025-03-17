import type{ NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
// import { validationResult } from "express-validator";

// import { Middleware } from "express-validator/src/base";

export const validateFields = (req: Request, res: Response, next: NextFunction):void => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }
    next();
};

