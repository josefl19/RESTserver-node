import express from "express"
import cors from "cors";

import { router } from "../routes/user.js";
import { dbConnection } from "../database/config.js";
import { routerAuth } from "../routes/auth.js";
import { routerCategorias } from "../routes/categorias.js";
import { routerProductos } from "../routes/productos.js";
import { routerBuscar } from "../routes/buscar.js";

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            usuariosPath: '/api/users',
            authPath: '/api/auth',
            categoriasPath: '/api/categorias',
            productosPath: '/api/productos',
            buscarPath: '/api/buscar'
        }

        // Conexión a base de datos (mongo)
        this.conectarBD();

        // Middlewares
        this.middlewares();

        // Rutas de aplicación
        this.routes();
    }

    async conectarBD() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parse del body
        this.app.use( express.json() );

        // public
        this.app.use( express.static('public'));
    }

    routes() {
        this.app.use(this.paths.usuariosPath, router);
        this.app.use(this.paths.authPath, routerAuth);
        this.app.use(this.paths.categoriasPath, routerCategorias);
        this.app.use(this.paths.productosPath, routerProductos);
        this.app.use(this.paths.buscarPath, routerBuscar);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`)
        })
    }
}

export { Server }