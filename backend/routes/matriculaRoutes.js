const {Router}= require('express')
const {createMatriculaController,getAllMatriculasController, updateMatriculaByIdController,deletedMatriculaByIdController} = require('../controllers/matriculaControllers')
const {Matricula } = require('../models')
const matriculaRouters = Router()
// create nuew Matricula
// post = publicar, get= obtner, put= actualizar y delete= eliminar
matriculaRouters.post("/",async(req, res)=>{
    const {matriculaId, fecha,carrera, studentId,gestionGrupoId,periodoAcademicoId} = req.body
    try {
        const newMatricula = await createMatriculaController({matriculaId, fecha, carrera, studentId,gestionGrupoId,periodoAcademicoId})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newMatricula)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
matriculaRouters.get("/",async(req,res)=>{
    try {
        const matriculas = await getAllMatriculasController()
        res.status(200).json(matriculas)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
matriculaRouters.put("/:matriculaId", async(req,res)=>{
    const {matriculaId}= req.params
    const matriculaData= req.body
    try {
        const updateMatricula = await updateMatriculaByIdController(matriculaId, matriculaData)
        if(!updateMatricula){
            return res.status(404).json({error: "matricula no encontrado"})
        }
        res.status(200).json(updateMatricula)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

matriculaRouters.delete("/:matriculaId", async(req, res)=>{
    const {matriculaId} = req.params
    try {
        const deletedMatricula = await deletedMatriculaByIdController(matriculaId)
        if(!deletedMatricula){
            return res.status.apply(404).json({error: "matricula no encontrado"})
        }
        res.status(200).json({message: "matricula eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    matriculaRouters
}