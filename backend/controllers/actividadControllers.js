const Actividad= require('../models/Actividad')
const createActividadController = async({id, usuario_id, rol, accion, fecha, descripcion})=>{
    try {
        const newActividad = await Actividad.create({id, usuario_id, rol, accion, fecha, descripcion})
        return newActividad
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllActividadsController = async () =>{
    try {
        const actividads = await Actividad.findAll()
        return actividads
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updateActividadByIdController = async (id, actividadData)=>{
    try {
        const actividad = await Actividad.findByPk(id)
        if(!actividad){
            return null
        }
        await actividad.update(actividadData)
        return actividad
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedActividadByIdController = async(id)=>{
   try {
    const actividad= await Actividad.findByPk(id)
    if(!actividad){
        return null
    }
    await actividad.destroy()
    return actividad
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createActividadController,
    getAllActividadsController,
    updateActividadByIdController,
    deletedActividadByIdController
}
