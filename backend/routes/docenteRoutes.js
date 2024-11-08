const {Router}= require('express')
const {createDocenteController,getAllDocentesController, updateDocenteByIdController,deletedDocenteByIdController} = require('../controllers/docenteControllers')
const { Docente } = require('../models')
const docenteRouters = Router()
// create nuew Docente
// post = publicar, get= obtner, put= actualizar y delete= eliminar
docenteRouters.post("/",async(req, res)=>{
    const {id,nombre,apellido,telefono,direccion,email} = req.body
    try {
        const newDocente = await createDocenteController({id,nombre,apellido,telefono,direccion,email})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newDocente)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
docenteRouters.get("/",async(req,res)=>{
    try {
        const docentes = await getAllDocentesController()
        res.status(200).json(docentes)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
docenteRouters.put("/:id", async(req,res)=>{
    const {id}= req.params
    const docenteData= req.body
    try {
        const updateDocente = await updateDocenteByIdController(id, docenteData)
        if(!updateDocente){
            return res.status(404).json({error: "docente no encontrado"})
        }
        res.status(200).json(updateDocente)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

docenteRouters.delete("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const deletedDocente = await deletedDocenteByIdController(id)
        if(!deletedDocente){
            return res.status.apply(404).json({error: "docente no encontrado"})
        }
        res.status(200).json({message: "docente eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module. exports={
    docenteRouters
}