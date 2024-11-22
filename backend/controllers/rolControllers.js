const Rol= require('../models/Rol')
const createRolController = async({rolId, usuarioId,rol})=>{
    try {
        const newRol = await Rol.create({rolId, usuarioId,rol})
        return newRol
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllRolsController = async () =>{
    try {
        const rols = await Rol.findAll()
        return rols
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updateRolByIdController = async (rolId, rolData)=>{
    try {
        const rol = await Rol.findByPk(rolId)
        if(!rol){
            return null
        }
        await rol.update(rolData)
        return rol
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedRolByIdController = async(rolId)=>{
   try {
    const rol= await Rol.findByPk(rolId)
    if(!rol){
        return null
    }
    await rol.destroy()
    return rol
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createRolController,
    getAllRolsController,
    updateRolByIdController,
    deletedRolByIdController
}
