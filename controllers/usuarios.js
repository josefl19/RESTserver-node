import { response } from "express";

// get
const usuariosGet = (req, res = response) => {
    const params = req.query;

    res.json({
        msg: "get API - controller",
        params
    });
}

// post
const usuariosPost = (req, res = response) => {
    const { nombre, edad } = req.body;
    
    res.json({
        msg: "post API - controller",
        nombre,
        edad
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