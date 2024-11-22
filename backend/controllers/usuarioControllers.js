const Usuario= require('../models/Usuario')
const bcrypt= require('bcrypt')

const createUsuarioController = async({usuarioId,nombreUsuario,contraseña})=>{
    const hashedPassword = await bcrypt.hash(contraseña,10)
    try {
        const newUsuario = await Usuario.create({usuarioId,nombreUsuario,contraseña:hashedPassword})
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
const updateUsuarioByIdController = async (usuarioId, usuarioData)=>{
    try {
        const usuario = await Usuario.findByPk(usuarioId)
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

const deletedUsuarioByIdController = async(usuarioId)=>{
   try {
    const usuario= await Usuario.findByPk(usuarioId)
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
