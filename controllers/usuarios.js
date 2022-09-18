import { response } from "express";
import bcryptjs from "bcryptjs";

import Usuario from '../models/usuario.js';

// get
const usuariosGet = (req, res = response) => {
    const params = req.query;

    res.json({
        msg: "get API - controller",
        params
    });
}

// post
const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );            // Creacion de la instancia

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();                        // Salt. Numero de vueltas para hacer más segura la contraseña. Default: 10
    usuario.password = bcryptjs.hashSync(password, salt);       // Se encirpta la contraseña con el salt

    //Grabar registro
    await usuario.save();
    
    res.json({
        msg: "post API - controller",
        usuario
    });
}

// put
const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: "put API - controller",
        id
    });
}

// patch
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: "patch API - controlador"
    });
}

// delete
const usuariosDelete = (req, res) => {
    res.json({
        msg: "delete API - controller"
    });
}

export {
    usuariosGet, 
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}