import { response } from "express";
import bcryptjs from "bcryptjs";

import Usuario from '../models/usuario.js';
import { generarJWT } from "../helpers/generar-jwt.js";
import { googleVerify } from "../helpers/google-verify.js";

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

const googleSignIn = async (req, res = response) => {
    const { id_token } = req.body;

    try {
        const googleUser = await googleVerify( id_token );
        console.log(googleUser)
        
        res.json({
            msg: 'Todo OK!',
            id_token
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }
}

export { login, googleSignIn }