const PlanEstudio= require('../models/PlanEstudio')
const createPlanEstudioController = async({id,student_id,meta,herramienta})=>{
    try {
        const newPlanEstudio = await PlanEstudio.create({id,student_id,meta,herramienta})
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
const updatePlanEstudioByIdController = async (id, planEstudiData)=>{
    try {
        const planEstudio = await PlanEstudio.findByPk(id)
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

const deletedPlanEstudioByIdController = async(id)=>{
   try {
    const planEstudio= await PlanEstudio.findByPk(id)
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