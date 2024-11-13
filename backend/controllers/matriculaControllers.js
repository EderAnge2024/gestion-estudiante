const Matricula= require('../models/Matricula')
const createMatriculaController = async({id,fecha,carrera})=>{
    try {
        const newMatricula = await Matricula.create({id,fecha,carrera})
        return newMatricula
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllMatriculaController = async () =>{
    try {
        const Matriculas = await Matricula.findAll()
        return Matriculas
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updateMatriculaByIdController = async (id, MatriculaData)=>{
    try {
        const matricula = await Matricula.findByPk(id)
        if(!matricula){
            return null
        }
        await matricula.update(MatriculaData)
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
    getAllMatriculaController,
    updateMatriculaByIdController,
    deletedMatriculaByIdController
}