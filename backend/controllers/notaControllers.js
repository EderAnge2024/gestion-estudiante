const Nota= require('../models/Nota')
const createNotaController = async({id,curso_id,student_id,fecha_ingre_nota,nota})=>{
    try {
        const newNota = await Nota.create({id,curso_id,student_id,fecha_ingre_nota,nota})
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
const updateNotaByIdController = async (id, notaData)=>{
    try {
        const nota = await Nota.findByPk(id)
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

const deletedNotaByIdController = async(id)=>{
   try {
    const nota= await Nota.findByPk(id)
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
