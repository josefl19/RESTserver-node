import { response } from "express";
import bcryptjs from "bcryptjs";

import Usuario from '../models/usuario.js';
import { generarJWT } from "../helpers/generar-jwt.js";

const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        // Verificar si el email existe.
        const usuario = await Usuario.findOne({ correo });
        if( !usuario ) {
            return res.status(400).json({
                msg: "Usuario o contraseñas incorrectos. Test correo"
            });
        }

        // Verificar si el usuario es activo.
        if( !usuario.estado ) {
            return res.status(400).json({
                msg: "Usuario o contraseñas incorrectos. Test estado: false"
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ) {
            return res.status(400).json({
                msg: "Usuario o contraseñas incorrectos. Test password"
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );


        res.json({
            msg: 'Login ok',
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contacte al administrador'
        });
    }

}

export { login }