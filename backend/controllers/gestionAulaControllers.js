const GestionAula= require('../models/GestionAula')
const createGestionAulaController = async({gestionAulaId,nombre,descripcion,estado})=>{
    try {
        const newGestionAula = await GestionAula.create({gestionAulaId,nombre,descripcion,estado})
        return newGestionAula
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllGestionAulasController = async () =>{
    try {
        const gestionAulas = await GestionAula.findAll()
        return gestionAulas
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updateGestionAulaByIdController = async (gestionAulaId, gestionAulaData)=>{
    try {
        const gestionAula = await GestionAula.findByPk(gestionAulaId)
        if(!gestionAula){
            return null
        }
        await gestionAula.update(gestionAulaData)
        return gestionAula
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedGestionAulaByIdController = async(gestionAulaId)=>{
   try {
    const gestionAula= await GestionAula.findByPk(gestionAulaId)
    if(!gestionAula){
        return null
    }
    await gestionAula.destroy()
    return gestionAula
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createGestionAulaController,
    getAllGestionAulasController,
    updateGestionAulaByIdController,
    deletedGestionAulaByIdController
}