import Role from "../models/role.js";
import Usuario from "../models/usuario.js";

const esRolValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ) {
        throw new Error(`El rol ${ rol } no existe en la base de datos`)
    }
}

const emailExiste = async(correo = '') => {
    const existEmail = await Usuario.findOne({ correo });
    if( existEmail ) {
        throw new Error(`El correo ya se encuentra registrado`)
    }
}

export { esRolValido, emailExiste }