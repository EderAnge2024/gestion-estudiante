const Usuario= require('../models/Usuario')
const createUsuarioController = async({id,nombreUsuario,contrasena})=>{
    try {
        const newUsuario = await Usuario.create({id,nombreUsuario,contrasena})
        return newUsuario
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllUsuariosController = async () =>{
    try {
        const usuarios = await Usuario.findAll()
        return usuarios
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updateUsuarioByIdController = async (id, usuarioData)=>{
    try {
        const usuario = await Usuario.findByPk(id)
        if(!usuario){
            return null
        }
        await usuario.update(usuarioData)
        return usuario
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedUsuarioByIdController = async(id)=>{
   try {
    const usuario= await Usuario.findByPk(id)
    if(!usuario){
        return null
    }
    await usuario.destroy()
    return usuario
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createUsuarioController,
    getAllUsuariosController,
    updateUsuarioByIdController,
    deletedUsuarioByIdController
}
