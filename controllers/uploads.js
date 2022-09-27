import { response } from "express";
import path from 'path';
import fs from 'fs';

// Para crear la ruta con ES Module
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

import { subirArchivo } from "../helpers/upload-file.js";

import Producto from "../models/producto.js";
import Usuario from "../models/usuario.js";

const cargarArchivo = async (req, res = response) => {
    try {
        const nombre = await subirArchivo( req.files, ['txt', 'md'], 'archivos' );
        res.json({ nombre });
    } catch (error) {
        res.json({ error })
    }
}

const actualizarImg = async (req, res = response ) => {
    const { id, coleccion } = req.params

    let modelo

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }
        break;
    
        default:
            return res.status(500).json({ msg: 'Opcion no validada en el servidor' });
    }

    // Limpiar imagenes previas
    if( modelo.img ) {
        // Borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if( fs.existsSync( pathImagen ) ) {
            fs.unlinkSync( pathImagen );            // Borrar
        }
    }
    
    const nombre = await subirArchivo( req.files, undefined, coleccion);
    modelo.img = nombre;    

    await modelo.save();

    res.json( modelo )
}

export { cargarArchivo, actualizarImg }