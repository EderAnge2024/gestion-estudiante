const {Router}= require('express')
const {createStudentController,getAllStudentsController, updateStudentByIdController,deletedStudentByIdController} = require('../controllers/studentControllers')
const { Student } = require('../models')
const studentRouters = Router()
// create nuew student
// post = publicar, get= obtner, put= actualizar y delete= eliminar
studentRouters.post("/",async(req, res)=>{
    const {studentId, dni,nombre,apellido,telefono,email,apoderado,direccion} = req.body
    try {
        const newStudent = await createStudentController({studentId,dni,nombre,apellido,telefono,email,apoderado,direccion})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newStudent)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
studentRouters.get("/",async(req,res)=>{
    try {
        const students = await getAllStudentsController()
        res.status(200).json(students)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
studentRouters.put("/:studentId", async(req,res)=>{
    const {studentId}= req.params
    const studentData= req.body
    try {
        const updateStudent = await updateStudentByIdController(studentId, studentData)
        if(!updateStudent){
            return res.status(404).json({error: "studiante no encontrado"})
        }
        res.status(200).json(updateStudent)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

studentRouters.delete("/:studentId", async(req, res)=>{
    const {studentId} = req.params
    try {
        const deletedStudent = await deletedStudentByIdController(studentId)
        if(!deletedStudent){
            return res.status.apply(404).json({error: "Studiante no encontrado"})
        }
        res.status(200).json({message: "Estudiante eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    studentRouters
}