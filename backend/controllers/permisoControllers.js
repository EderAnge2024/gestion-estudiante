const Permiso= require('../models/Permiso')
const createPermisoController = async({permisoId, rolId,accion,descripcion})=>{
    try {
        const newPermiso = await Permiso.create({permisoId, rolId,accion,descripcion})
        return newPermiso
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllPermisosController = async () =>{
    try {
        const permisos = await Permiso.findAll()
        return permisos
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updatePermisoByIdController = async (permisoId, permisoData)=>{
    try {
        const permiso = await Permiso.findByPk(permisoId)
        if(!permiso){
            return null
        }
        await permiso.update(permisoData)
        return permiso
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedPermisoByIdController = async(permisoId)=>{
   try {
    const permiso= await Permiso.findByPk(permisoId)
    if(!permiso){
        return null
    }
    await permiso.destroy()
    return permiso
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createPermisoController,
    getAllPermisosController,
    updatePermisoByIdController,
    deletedPermisoByIdController
}
