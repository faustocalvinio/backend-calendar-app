import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
export const validateJWT = (req: Request, res: Response, next: NextFunction) => {
    // X-TOKEN HEADERS
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'no token in the request'
        });
    };
    try {
        const { uid, name } = verify(
            token,
            process.env.JWT_SECRET_PRIVATE_KEY!
        );
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token is not valid'
        })
    };
    next();
};

