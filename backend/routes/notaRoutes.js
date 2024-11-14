const {Router}= require('express')
const {createNotaController,getAllNotasController, updateNotaByIdController,deletedNotaByIdController} = require('../controllers/notaControllers')
const { Nota } = require('../models')
const notaRouters = Router()
// create nuew student
// post = publicar, get= obtner, put= actualizar y delete= eliminar
notaRouters.post("/",async(req, res)=>{
    const {id,curso_id,student_id,fecha_ingre_nota,nota} = req.body
    try {
        const newNota = await createNotaController({id,curso_id,student_id,fecha_ingre_nota,nota})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newNota)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
notaRouters.get("/",async(req,res)=>{
    try {
        const notas = await getAllNotasController()
        res.status(200).json(notas)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
notaRouters.put("/:id", async(req,res)=>{
    const {id}= req.params
    const notaData= req.body
    try {
        const updateNota = await updateNotaByIdController(id, notaData)
        if(!updateNota){
            return res.status(404).json({error: "Nota no encontrado"})
        }
        res.status(200).json(updateNota)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

notaRouters.delete("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const deletedNota = await deletedNotaByIdController(id)
        if(!deletedNota){
            return res.status.apply(404).json({error: "Notano encontrado"})
        }
        res.status(200).json({message: "Nota eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    notaRouters
}