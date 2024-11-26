const {Router}= require('express')
const {createGestionAulaController,getAllGestionAulasController, updateGestionAulaByIdController,deletedGestionAulaByIdController} = require('../controllers/gestionAulaControllers')
const { GestionAula } = require('../models')
const gestionAulaRouters = Router()
// create nuew GestionAula
// post = publicar, get= obtner, put= actualizar y delete= eliminar
gestionAulaRouters.post("/",async(req, res)=>{
    const {gestionAulaId,nombre,descripcion, estado} = req.body
    try {
        const newGestionAula = await createGestionAulaController({gestionAulaId,nombre,descripcion, estado})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newGestionAula)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
gestionAulaRouters.get("/",async(req,res)=>{
    try {
        const gestionAulas = await getAllGestionAulasController()
        res.status(200).json(gestionAulas)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
gestionAulaRouters.put("/:gestionAulaId", async(req,res)=>{
    const {gestionAulaId}= req.params
    const gestionAulaData= req.body
    try {
        const updateGestionAula = await updateGestionAulaByIdController(gestionAulaId, gestionAulaData)
        if(!updateGestionAula){
            return res.status(404).json({error: "aula no encontrado"})
        }
        res.status(200).json(updateGestionAula)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

gestionAulaRouters.delete("/:gestionAulaId", async(req, res)=>{
    const {gestionAulaId} = req.params
    try {
        const deletedGestionAula = await deletedGestionAulaByIdController(gestionAulaId)
        if(!deletedGestionAula){
            return res.status.apply(404).json({error: "aula no encontrado"})
        }
        res.status(200).json({message: "aula eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    gestionAulaRouters
}