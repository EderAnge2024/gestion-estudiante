const {Router}= require('express')
const {createPreriquisitoCursoController,getAllPreriquisitoCursosController, updatePreriquisitoCursoByIdController,deletedPreriquisitoCursoByIdController} = require('../controllers/prerrequisitoCursoControllers')
const { PreriquisitoCurso } = require('../models')
const preriquisitoCursoRouters = Router()
// create nuew student
// post = publicar, get= obtner, put= actualizar y delete= eliminar
preriquisitoCursoRouters.post("/",async(req, res)=>{
    const {id, student_id, curso_id, requisito} = req.body
    try {
        const newPreriquisitoCurso = await createPreriquisitoCursoController({id, student_id, curso_id, requisito})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newPreriquisitoCurso)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
preriquisitoCursoRouters.get("/",async(req,res)=>{
    try {
        const preriquisitoCursos = await getAllPreriquisitoCursosController()
        res.status(200).json(preriquisitoCursos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
preriquisitoCursoRouters.put("/:id", async(req,res)=>{
    const {id}= req.params
    const preriquisitoCursoData= req.body
    try {
        const updatePreriquisitoCurso = await updatePreriquisitoCursoByIdController(id, preriquisitoCursoData)
        if(!updatePreriquisitoCurso){
            return res.status(404).json({error: "studiante no encontrado"})
        }
        res.status(200).json(updatePreriquisitoCurso)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

preriquisitoCursoRouters.delete("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const deletedPreriquisitoCurso = await deletedPreriquisitoCursoByIdController(id)
        if(!deletedPreriquisitoCurso){
            return res.status.apply(404).json({error: "PreriquisitoCurso no encontrado"})
        }
        res.status(200).json({message: "PreriquisitoCurso eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    preriquisitoCursoRouters
}