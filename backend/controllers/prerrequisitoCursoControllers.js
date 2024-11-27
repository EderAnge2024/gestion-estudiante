const PrerrequisitoCurso= require('../models/PrerrequisitoCurso')
const createPreriquisitoCursoController = async({preriquisitoCursoId, studentId, courseId, requisito})=>{
    try {
        const newPrerrequisitoCurso = await PrerrequisitoCurso.create({preriquisitoCursoId, studentId, courseId, requisito})
        return newPrerrequisitoCurso
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllPreriquisitoCursosController = async () =>{
    try {
        const prerrequisitoCursos = await PrerrequisitoCurso.findAll()
        return prerrequisitoCursos
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updatePreriquisitoCursoByIdController = async (preriquisitoCursoId, prerrequisitoCursoData)=>{
    try {
        const prerrequisitoCurso = await PrerrequisitoCurso.findByPk(preriquisitoCursoId)
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

const deletedPreriquisitoCursoByIdController = async(preriquisitoCursoId)=>{
   try {
    const prerrequisitoCurso= await PrerrequisitoCurso.findByPk(preriquisitoCursoId)
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
    createPreriquisitoCursoController,
    getAllPreriquisitoCursosController,
    updatePreriquisitoCursoByIdController,
    deletedPreriquisitoCursoByIdController
}
