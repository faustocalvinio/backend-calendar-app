import { Request, Response } from "express";
import User from "../models/User";
import bcryptjs from "bcryptjs"
import { generateJWT } from "../helpers/jwt"
interface CustomReq extends Request {
    uid: string,
    name: string
}
export const createUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                ok: false,
                msg: 'El user ya existe con ese email'
            });
        };

        user = new User(req.body);
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(password, salt);

        await user.save();
        // GENERAR TOKEN 
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        });
    };
};

export const loginUser = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El user no existe con ese email'
            });
        };

        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password es incorrecto'
            })
        };
        // GENERAR TOKEN DE AUTH
        const token = await generateJWT(user.id, user.name);

        res.status(200).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, hable con el administrador'
        });
    };
};



export const renewToken = async (req: CustomReq, res: Response) => {

    const { uid, name } = req;
    const token = await generateJWT(uid, name);

    res.status(201).json({
        ok: true,
        uid, name,
        token
    });
};

