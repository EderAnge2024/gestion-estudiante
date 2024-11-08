const Docente= require('../models/Docente')
const createDocenteController = async({id,nombre,apellido,telefono,direccion,email})=>{
    try {
        const newDocente = await Docente.create({id,nombre,apellido,telefono,direccion,email})
        return newDocente
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllDocentesController = async () =>{
    try {
        const docentes = await Docente.findAll()
        return docentes
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updateDocenteByIdController = async (id, docenteData)=>{
    try {
        const docente = await Docente.findByPk(id)
        if(!docente){
            return null
        }
        await docente.update(docenteData)
        return docente
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedDocenteByIdController = async(id)=>{
   try {
    const docente= await Docente.findByPk(id)
    if(!docente){
        return null
    }
    await docente.destroy()
    return docente
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createDocenteController,
    getAllDocentesController,
    updateDocenteByIdController,
    deletedDocenteByIdController
}
