const GestionAula= require('../models/GestionAula')
const createGestionAulaController = async({id,nombre,descripcion,estado})=>{
    try {
        const newGestionAula = await GestionAula.create({id,nombre,descripcion,estado})
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
const updateGestionAulaByIdController = async (id, gestionAulaData)=>{
    try {
        const gestionAula = await GestionAula.findByPk(id)
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

const deletedGestionAulaByIdController = async(id)=>{
   try {
    const gestionAula= await GestionAula.findByPk(id)
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