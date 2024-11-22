const Nota= require('../models/Nota')

const createNotaController = async({notaId,courseId,studentId,fecha_ingre_nota,nota})=>{
    try {
        const newNota = await Nota.create({notaId,courseId,studentId,fecha_ingre_nota,nota})
        return newNota
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los notas
const getAllNotasController = async () =>{
    try {
        const notas = await Nota.findAll()
        return notas
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updateNotaByIdController = async (notaId, notaData)=>{
    try {
        const nota = await Nota.findByPk(notaId)
        if(!nota){
            return null
        }
        await nota.update(notaData)
        return nota
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedNotaByIdController = async(notaId)=>{
   try {
    const nota= await Nota.findByPk(notaId)
    if(!nota){
        return null
    }
    await nota.destroy()
    return nota
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createNotaController,
    getAllNotasController,
    updateNotaByIdController,
    deletedNotaByIdController
}
