const GestionGrupo= require('../models/GestionGrupo')
const createGestionGrupoController = async({id, curso_id,docente_id, periodoAcademico_id})=>{
    try {
        const newGestioGrupo = await GestionGrupo.create({id, curso_id,docente_id, periodoAcademico_id})
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
const updateGestionGrupoByIdController = async (id, gestionGrupoData)=>{
    try {
        const gestionGrupo = await GestionGrupo.findByPk(id)
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

const deletedGestionGrupoByIdController = async(id)=>{
   try {
    const gestionGrupo= await GestionGrupo.findByPk(id)
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
