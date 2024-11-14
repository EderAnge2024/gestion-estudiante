const Permiso= require('../models/Permiso')
const createPermisoController = async({id, rol_id,accion,descripcion})=>{
    try {
        const newPermiso = await Permiso.create({id, rol_id,accion,descripcion})
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
const updatePermisoByIdController = async (id, permisoData)=>{
    try {
        const permiso = await Permiso.findByPk(id)
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

const deletedPermisoByIdController = async(id)=>{
   try {
    const permiso= await Permiso.findByPk(id)
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
