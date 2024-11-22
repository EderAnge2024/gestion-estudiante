const PlanEstudio= require('../models/PlanEstudio')
const createPlanEstudioController = async({planEstudioId,studentId,meta,herramienta})=>{
    try {
        const newPlanEstudio = await PlanEstudio.create({planEstudioId,studentId,meta,herramienta})
        return newPlanEstudio
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllPlanEstudiosController = async () =>{
    try {
        const planEstudios = await PlanEstudio.findAll()
        return planEstudios
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updatePlanEstudioByIdController = async (planEstudioId, planEstudiData)=>{
    try {
        const planEstudio = await PlanEstudio.findByPk(planEstudioId)
        if(!planEstudio){
            return null
        }
        await planEstudio.update(planEstudiData)
        return planEstudio
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedPlanEstudioByIdController = async(planEstudioId)=>{
   try {
    const planEstudio= await PlanEstudio.findByPk(planEstudioId)
    if(!planEstudio){
        return null
    }
    await planEstudio.destroy()
    return planEstudio
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createPlanEstudioController,
    getAllPlanEstudiosController,
    updatePlanEstudioByIdController,
    deletedPlanEstudioByIdController
}