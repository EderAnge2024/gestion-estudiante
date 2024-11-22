const {Router}= require('express')
const {createRolController,getAllRolsController, updateRolByIdController,deletedRolByIdController} = require('../controllers/rolControllers')
const { Rol } = require('../models')
const rolRouters = Router()
// create nuew Rol
// post = publicar, get= obtner, put= actualizar y delete= eliminar
rolRouters.post("/",async(req, res)=>{
    const {rolId, usuarioId,rol} = req.body
    try {
        const newRol = await createRolController({rolId, usuarioId,rol})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newRol)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
rolRouters.get("/",async(req,res)=>{
    try {
        const rols = await getAllRolsController()
        res.status(200).json(rols)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
rolRouters.put("/:rolId", async(req,res)=>{
    const {rolId}= req.params
    const rolData= req.body
    try {
        const updateRol = await updateRolByIdController(rolId, rolData)
        if(!updateRol){
            return res.status(404).json({error: "Rol no encontrado"})
        }
        res.status(200).json(updateRol)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

rolRouters.delete("/:rolId", async(req, res)=>{
    const {rolId} = req.params
    try {
        const deletedRol = await deletedRolByIdController(rolId)
        if(!deletedRol){
            return res.status.apply(404).json({error: "Rol no encontrado"})
        }
        res.status(200).json({message: "Rol eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    rolRouters
}