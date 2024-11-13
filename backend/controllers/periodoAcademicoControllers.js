const PeriodoAcademico= require('../models/PeriodoAcademico')
const createPeriodoAcademicoController = async({id, docente_id, fechaInicio,fechaFinal,estado,ciclo})=>{
    try {
        const newPeriodoAcademico = await PeriodoAcademico.create({id, docente_id, fechaInicio,fechaFinal,estado,ciclo})
        return newPeriodoAcademico
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllPeriodoAcademicosController = async () =>{
    try {
        const periodoAcademicos = await PeriodoAcademico.findAll()
        return periodoAcademicos
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updatePeriodoAcademicoByIdController = async (id, periodoAcademicoData)=>{
    try {
        const periodoAcademico = await PeriodoAcademico.findByPk(id)
        if(!periodoAcademico){
            return null
        }
        await periodoAcademico.update(periodoAcademicoData)
        return periodoAcademico
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedPeriodoAcademicoByIdController = async(id)=>{
   try {
    const periodoAcademico= await PeriodoAcademico.findByPk(id)
    if(!periodoAcademico){
        return null
    }
    await periodoAcademico.destroy()
    return periodoAcademico
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createPeriodoAcademicoController,
    getAllPeriodoAcademicosController,
    updatePeriodoAcademicoByIdController,
    deletedPeriodoAcademicoByIdController
}
