/*
    Rutas de usuarios /auth
    host + /api/events
*/

import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import { deleteEvent, getEvents, updateEvent } from "../controllers/events";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { isDate } from "../helpers/isDate";
import { Middleware } from "express-validator/src/base";
import mongoose from "mongoose";
import Event from "../models/Event";
const router = Router()

// USAR MIDDLEWARE PARA TODO
router.use(validateJWT as Middleware);

router.get('/', getEvents);




router.post('/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        validateFields as Middleware
    ]
    , createEvent);

router.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validateFields as Middleware
    ],
    updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;