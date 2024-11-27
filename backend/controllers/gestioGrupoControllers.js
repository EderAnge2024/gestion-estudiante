const GestionGrupo= require('../models/GestionGrupo')
const createGestionGrupoController = async({gestionGrupoId, courseId,docenteId, periodoAcademicoId})=>{
    try {
        const newGestioGrupo = await GestionGrupo.create({gestionGrupoId, courseId,docenteId, periodoAcademicoId})
        return newGestioGrupo
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllGestionGruposController = async () =>{
    try {
        const gestioGrupos = await GestionGrupo.findAll()
        return gestioGrupos
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updateGestionGrupoByIdController = async (gestionGrupoId, gestionGrupoData)=>{
    try {
        const gestionGrupo = await GestionGrupo.findByPk(gestionGrupoId)
        if(!gestionGrupo){
            return null
        }
        await gestionGrupo.update(gestionGrupoData)
        return gestionGrupo
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedGestionGrupoByIdController = async(gestionGrupoId)=>{
   try {
    const gestionGrupo= await GestionGrupo.findByPk(gestionGrupoId)
    if(!gestionGrupo){
        return null
    }
    await gestionGrupo.destroy()
    return gestionGrupo
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createGestionGrupoController,
    getAllGestionGruposController,
    updateGestionGrupoByIdController,
    deletedGestionGrupoByIdController
}
