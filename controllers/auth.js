const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne( { email } );

        if ( user ) {
            return res.status(400).json({
                ok:false,
                msg:'El user ya existe con ese email'
            });        
        }

        user = new User( req.body );

        const salt = bcryptjs.genSaltSync();

        user.password = bcryptjs.hashSync( password, salt );

        await user.save();
        // GENERAR TOKEN 
        const token = await generateJWT( user.id, user.name );

        res.status(201).json({
            ok:true,
            uid: user.id,
            name: user.name,     
            token 
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado, hable con el administrador'
        });
    }
}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;
    

    try {
        const user = await User.findOne( { email } );

        if ( !user ) {
            return res.status(400).json({
                ok:false,
                msg:'El user no existe con ese email'
            });        
        }

        const validPassword = bcryptjs.compareSync( password, user.password );

        if (!validPassword) {
            return res.status(400).json({
                ok:false,
                msg:'El password es incorrecto'
            })
        }
        // GENERAR TOKEN DE AUTH
        const token = await generateJWT( user.id, user.name );

        res.status(200).json({
            ok:true,
            uid: user.id,
            name: user.name,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado, hable con el administrador'
        });
    }    
}

const renewToken = async (req, res = response) => {

    const { uid,name } = req ;   
    const token = await generateJWT( uid , name );

    res.status(201).json({
        ok:true,     
        uid,name,  
        token
    })    
}



module.exports = {
    createUser,
    loginUser,
    renewToken
}