const {Router}= require('express')
const {createCourseController,getAllCourseController,updateCourseByIdController,deletedCourseByIdController} = require('../controllers/courseControllers')
const { Course } = require('../models')
const courseRouters = Router()

// post = publicar, get= obtner, put= actualizar y delete= eliminar
courseRouters.post("/",async(req, res)=>{
    const {courseId,planEstudioId,docenteId,nombre,credito,ciclo} = req.body
    try {
        const newCourse = await createCourseController({courseId,planEstudioId,docenteId,nombre,credito,ciclo})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newCourse)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes
courseRouters.get("/",async(req,res)=>{
    try {
        const courses = await getAllCourseController()
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
 // actualizar un estudiante por medio de su id o eliminar depende de lo que quieras hacer
// delete, update, get
courseRouters.put("/:courseId", async(req,res)=>{
    const {courseId}= req.params
    const CourseData= req.body
    try {
        const updateCourse = await updateCourseByIdController(courseId, CourseData)
        if(!updateCourse){
            return res.status(404).json({error: "curso no encontrado"})
        }
        res.status(200).json(updateCourse)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})
courseRouters.delete("/:courseId", async(req, res)=>{
    const {courseId} = req.params
    try {
        const deletedCourse = await deletedCourseByIdController(courseId)
        if(!deletedCourse){
            return res.status.apply(404).json({error: "curso no encontrado"})
        }
        res.status(200).json({message: "curso eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
module. exports={
    courseRouters
}