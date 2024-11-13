const {Router}= require('express')
const {createPlanEstudioController,getAllPlanEstudiosController, updatePlanEstudioByIdController,deletedPlanEstudioByIdController} = require('../controllers/planEstudioControllers')
const { PlanEstudio } = require('../models')
const planEstudioRouters = Router()
// create nuew student
// post = publicar, get= obtner, put= actualizar y delete= eliminar
planEstudioRouters.post("/",async(req, res)=>{
    const {id,student_id,meta,herramienta} = req.body
    try {
        const newPlanEstudio = await createPlanEstudioController({id,student_id,meta,herramienta})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newPlanEstudio)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
planEstudioRouters.get("/",async(req,res)=>{
    try {
        const planEstudios = await getAllPlanEstudiosController()
        res.status(200).json(planEstudios)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
planEstudioRouters.put("/:id", async(req,res)=>{
    const {id}= req.params
    const planEstudioData= req.body
    try {
        const updatePlanEstudio = await updatePlanEstudioByIdController(id, planEstudioData)
        if(!updatePlanEstudio){
            return res.status(404).json({error: "plan de estudio no encontrado"})
        }
        res.status(200).json(updatePlanEstudio)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

planEstudioRouters.delete("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const deletedPlanEstudio = await deletedPlanEstudioByIdController(id)
        if(!deletedPlanEstudio){
            return res.status.apply(404).json({error: "plan de estudio no encontrado"})
        }
        res.status(200).json({message: "plan de estudio eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    planEstudioRouters
}