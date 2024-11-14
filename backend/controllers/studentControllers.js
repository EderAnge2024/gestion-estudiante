const Student= require('../models/Student')
const createStudentController = async({dni,nombre,apellido,telefono,email,apoderado,direccion})=>{
    try {
        const newStudent = await Student.create({dni,nombre,apellido,telefono,email,apoderado,direccion})
        return newStudent
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllStudentsController = async () =>{
    try {
        const students = await Student.findAll()
        return students
    } catch (error) {
        throw new Error(error.message)
    }
}

// para actualizar
const updateStudentByIdController = async (dni, studentData)=>{
    try {
        const student = await Student.findByPk(dni)
        if(!student){
            return null
        }
        await student.update(studentData)
        return student
    } catch (error) {
        throw new Error(error.message)
    }
}
// para eliminar

const deletedStudentByIdController = async(dni)=>{
   try {
    const student= await Student.findByPk(dni)
    if(!student){
        return null
    }
    await student.destroy()
    return student
   } catch (error) {
    throw new  Error(error.message)
   }
}

module.exports={
    createStudentController,
    getAllStudentsController,
    updateStudentByIdController,
    deletedStudentByIdController
}
