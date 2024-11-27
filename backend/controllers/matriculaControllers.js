const Matricula= require('../models/Matricula')
const createMatriculaController = async({matriculaId, fecha,carrera, studentId,gestionGrupoId,periodoAcademicoId})=>{
    try {
        const newMatricula = await Matricula.create({matriculaId, fecha,carrera, studentId,gestionGrupoId,periodoAcademicoId})
        return newMatricula
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllMatriculasController = async () =>{
    try {
        const matriculas = await Matricula.findAll()
        return matriculas
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updateMatriculaByIdController = async (matriculaId, matriculaData)=>{
    try {
        const matricula = await Matricula.findByPk(matriculaId)
        if(!matricula){
            return null
        }
        await matricula.update(matriculaData)
        return matricula
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedMatriculaByIdController = async(matriculaId)=>{
   try {
    const matricula= await Matricula.findByPk(matriculaId)
    if(!matricula){
        return null
    }
    await matricula.destroy()
    return matricula
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createMatriculaController,
    getAllMatriculasController,
    updateMatriculaByIdController,
    deletedMatriculaByIdController
}
