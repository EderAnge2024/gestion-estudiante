const {Router}= require('express')
const {createGestionAulaController,getAllGestionAulasController, updateGestionAulaByIdController,deletedGestionAulaByIdController} = require('../controllers/gestionAulaControllers')
const { GestionAula } = require('../models')
const gestionAulaRouters = Router()
// create nuew GestionAula
// post = publicar, get= obtner, put= actualizar y delete= eliminar
gestionAulaRouters.post("/",async(req, res)=>{
    const {id,nombre,descripcion, estado} = req.body
    try {
        const newGestionAula = await createGestionAulaController({id,nombre,descripcion, estado})
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
gestionAulaRouters.put("/:id", async(req,res)=>{
    const {id}= req.params
    const gestionAulaData= req.body
    try {
        const updateGestionAula = await updateGestionAulaByIdController(id, gestionAulaData)
        if(!updateGestionAula){
            return res.status(404).json({error: "aula no encontrado"})
        }
        res.status(200).json(updateGestionAula)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

gestionAulaRouters.delete("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const deletedGestionAula = await deletedGestionAulaByIdController(id)
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