const PrerrequisitoCurso= require('../models/PrerrequisitoCurso')
const createPrerrequisitoCursoController = async({id, student_id, curso_id, requisito})=>{
    try {
        const newPrerrequisitoCurso = await PrerrequisitoCurso.create({id, student_id, curso_id, requisito})
        return newPrerrequisitoCurso
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllPrerrequisitoCursosController = async () =>{
    try {
        const prerrequisitoCursos = await PrerrequisitoCurso.findAll()
        return prerrequisitoCursos
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updatePrerrequisitoCursoByIdController = async (id, prerrequisitoCursoData)=>{
    try {
        const prerrequisitoCurso = await PrerrequisitoCurso.findByPk(id)
        if(!prerrequisitoCurso){
            return null
        }
        await prerrequisitoCurso.update(prerrequisitoCursoData)
        return prerrequisitoCurso
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedPrerrequisitoCursoByIdController = async(id)=>{
   try {
    const prerrequisitoCurso= await PrerrequisitoCurso.findByPk(id)
    if(!prerrequisitoCurso){
        return null
    }
    await prerrequisitoCurso.destroy()
    return prerrequisitoCurso
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createPrerrequisitoCursoController,
    getAllPrerrequisitoCursosController,
    updatePrerrequisitoCursoByIdController,
    deletedPrerrequisitoCursoByIdController
}
