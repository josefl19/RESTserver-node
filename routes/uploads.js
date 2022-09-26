import { Router } from "express";
import { check } from "express-validator";

import { cargarArchivo } from "../controllers/uploads.js";

import { validarCampos } from "../middlewares/validarCampos.js";

const routerUpload = new Router();

routerUpload.post('/', cargarArchivo )

export { routerUpload }