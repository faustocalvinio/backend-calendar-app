const { response } = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = ( req, res = response, next ) => {
    // X-TOKEN HEADERS
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'no token in the request'
        });
    
    }
    try {
        const { uid, name } = jwt.verify(
            token,
            process.env.JWT_SECRET_PRIVATE_KEY
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token is not valid'
        })
    }
    next();
}


module.exports = { 
    validateJWT
}