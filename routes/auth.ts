/*
    Rutas de usuarios /auth
    host + /api/auth
*/

import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { createUser, loginUser, renewToken } from "../controllers/auth";
import { validateJWT } from "../middlewares/validate-jwt";
import { Router } from "express";

const router = Router()

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    createUser
)

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    loginUser)

router.get('/renew', validateJWT, renewToken)

module.exports = router;