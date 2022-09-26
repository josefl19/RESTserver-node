import { response } from "express";

import { subirArchivo } from "../helpers/upload-file.js";

const cargarArchivo = async (req, res = response) => {

    // Validar que venga con algo req.files y req.files.archivo con la carga de al menos uno.
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        res.status(400).json('No hay archivos por subir');
        return;
    }

    try {
        const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
        res.json({ nombre });
    } catch (error) {
        res.json({ error })
    }
}

export { cargarArchivo }