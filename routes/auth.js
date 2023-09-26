/*
    Rutas de usuarios /auth
    host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

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

router.get( '/renew', validateJWT, renewToken )

module.exports = router;