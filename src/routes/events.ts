import { Router } from "express";
import { validateJWT } from "../middlewares/validate-jwt";
import { createEvent, deleteEvent, getEvents, updateEvent } from "../controllers/events";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields";
import { isDate } from "../helpers/isDate";
export const eventsRouter = Router();

eventsRouter.use(validateJWT);

eventsRouter.get('/', getEvents);

eventsRouter.post('/',
    [
        check('title', 'Title is required').not().isEmpty(),
        check('start', 'Start date is required').custom(isDate),
        check('end', 'End date is required').custom(isDate),
        validateFields
    ]
    , createEvent);

eventsRouter.put('/:id',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha de finalización es obligatoria').custom(isDate),
        validateFields
    ],
    updateEvent);

eventsRouter.delete('/:id', deleteEvent);

