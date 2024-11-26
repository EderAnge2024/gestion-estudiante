const {Router}= require('express')
const {createPeriodoAcademicoController,getAllPeriodoAcademicosController, updatePeriodoAcademicoByIdController,deletedPeriodoAcademicoByIdController} = require('../controllers/periodoAcademicoControllers')
const { PeriodoAcademico } = require('../models')
const periodoAcademicoRouters = Router()
// create nuew PeriodoAcademico
// post = publicar, get= obtner, put= actualizar y delete= eliminar
periodoAcademicoRouters.post("/",async(req, res)=>{
    const {periodoAcademicoId, docenteId, fechaInicio,fechaFinal,estado,ciclo} = req.body
    try {
        const newPeriodoAcademico = await createPeriodoAcademicoController({periodoAcademicoId, docenteId, fechaInicio,fechaFinal,estado,ciclo})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newPeriodoAcademico)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
periodoAcademicoRouters.get("/",async(req,res)=>{
    try {
        const periodoAcademicos = await getAllPeriodoAcademicosController()
        res.status(200).json(periodoAcademicos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
periodoAcademicoRouters.put("/:periodoAcademicoId", async(req,res)=>{
    const {periodoAcademicoId}= req.params
    const periodoAcademicoData= req.body
    try {
        const updatePeriodoAcademico = await updatePeriodoAcademicoByIdController(periodoAcademicoId, periodoAcademicoData)
        if(!updatePeriodoAcademico){
            return res.status(404).json({error: "studiante no encontrado"})
        }
        res.status(200).json(updatePeriodoAcademico)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

periodoAcademicoRouters.delete("/:periodoAcademicoId", async(req, res)=>{
    const {periodoAcademicoId} = req.params
    try {
        const deletedPeriodoAcademico = await deletedPeriodoAcademicoByIdController(periodoAcademicoId)
        if(!deletedPeriodoAcademico){
            return res.status.apply(404).json({error: "PeriodoAcademico no encontrado"})
        }
        res.status(200).json({message: "PeriodoAcademico eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    periodoAcademicoRouters
}