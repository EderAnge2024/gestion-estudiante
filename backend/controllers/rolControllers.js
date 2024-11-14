const Rol= require('../models/Rol')
const createRolController = async({id, usuario_id,rol})=>{
    try {
        const newRol = await Rol.create({id, usuario_id,rol})
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
const updateRolByIdController = async (id, rolData)=>{
    try {
        const rol = await Rol.findByPk(id)
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

const deletedRolByIdController = async(id)=>{
   try {
    const rol= await Rol.findByPk(id)
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
