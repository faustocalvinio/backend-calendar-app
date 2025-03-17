import type { NextFunction, Request, Response } from "express";
// import type{ Middleware } from "express-validator/src/base.js";
import jwt from "jsonwebtoken";
const { verify } = jwt


import { type JwtPayload } from "jsonwebtoken";
// Extender la interfaz Request para agregar las propiedades `uid` y `name`
interface CustomReq extends Request {
    uid?: string;
    name?: string;
}

// Cambiar la firma del middleware para que sea compatible con Express
export const validateJWT = (req: CustomReq, res: Response, next: NextFunction): void => {
    const token = req.header('x-token');

    if (!token) {
        res.status(401).json({
            ok: false,
            msg: 'No token in the request',
        });
    }

    try {
        const payload = verify(
            token!,
            process.env.JWT_SECRET_PRIVATE_KEY!
        ) as JwtPayload;

        const { uid, name } = payload;
        req.uid = uid;
        req.name = name;

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token is not valid',
        });
    }

    next();
};
