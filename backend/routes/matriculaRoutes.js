const {Router}= require('express')
const {createMatriculaController,getAllMatriculaController, updateMatriculaByIdController,deletedMatriculaByIdController} = require('../controllers/matriculaControllers')
const { Matricula } = require('../models')
const matriculaRouters = Router()
// create nuew GestionAula
// post = publicar, get= obtner, put= actualizar y delete= eliminar
matriculaRouters.post("/",async(req, res)=>{
    const {id,fecha,carrera } = req.body
    try {
        const newMatricula = await createMatriculaController({id,fecha,carrera })
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newMatricula)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
matriculaRouters.get("/",async(req,res)=>{
    try {
        const matricula = await getAllMatriculaController()
        res.status(200).json(matricula)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
matriculaRouters.put("/:id", async(req,res)=>{
    const {id}= req.params
    const matriculaData= req.body
    try {
        const updateMatricula = await updateMatriculaByIdController(id, matriculaData)
        if(!updateMatricula){
            return res.status(404).json({error: "aula no encontrado"})
        }
        res.status(200).json(updateMatricula)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

matriculaRouters.delete("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const deletedMatricula = await deletedMatriculaByIdController(id)
        if(!deletedMatricula){
            return res.status.apply(404).json({error: "Matricula no encontrado"})
        }
        res.status(200).json({message: "Matricula eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module. exports={
    matriculaRouters
}