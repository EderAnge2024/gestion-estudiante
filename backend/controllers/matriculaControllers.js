const Matricula= require('../models/Matricula')
const createMatriculaController = async({id, fecha,carrera, estudent_id,grupo_id,periodoAcademico_id})=>{
    try {
        const newMatricula = await Matricula.create({id, fecha,carrera, estudent_id,grupo_id,periodoAcademico_id})
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
const updateMatriculaByIdController = async (id, matriculaData)=>{
    try {
        const matricula = await Matricula.findByPk(id)
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

const deletedMatriculaByIdController = async(id)=>{
   try {
    const matricula= await Matricula.findByPk(id)
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
