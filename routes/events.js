/*
    Rutas de usuarios /auth
    host + /api/events
*/

const { Router } = require('express');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validateFields } = require('../middlewares/validate-fields')
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { isDate } = require('../helpers/isDate');


const router = Router();

// USAR MIDDLEWARE PARA TODO
router.use( validateJWT );

router.get('/', getEvents );

router.post('/', 
[
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom( isDate ),
    check('end', 'End date is required').custom( isDate ),
    validateFields
]
,createEvent );

router.put('/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validateFields
    ],
    updateEvent );

router.delete('/:id', deleteEvent );


module.exports = router;