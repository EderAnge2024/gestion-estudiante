const {Router}= require('express')
const {createUsuarioController,getAllUsuariosController, updateUsuarioByIdController,deletedUsuarioByIdController} = require('../controllers/usuarioControllers')
const { Usuario } = require('../models')
const usuarioRouters = Router()
// create nuew student
// post = publicar, get= obtner, put= actualizar y delete= eliminar
usuarioRouters.post("/",async(req, res)=>{
    const {usuarioId,nombreUsuario,contraseña} = req.body
    try {
        const newUsuario = await createUsuarioController({usuarioId,nombreUsuario,contraseña})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newUsuario)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los usuarios get
usuarioRouters.get("/",async(req,res)=>{
    try {
        const usuarios = await getAllUsuariosController()
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
usuarioRouters.put("/:usuarioId", async(req,res)=>{
    const {usuarioId}= req.params
    const usuarioData= req.body
    try {
        const updateUsuario = updateUsuarioByIdController(usuarioId, usuarioData)
        if(!updateUsuario){
            return res.status(404).json({error: "usuario no encontrado"})
        }
        res.status(200).json(updateUsuario)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

usuarioRouters.delete("/:usuarioId", async(req, res)=>{
    const {usuarioId} = req.params
    try {
        const deletedUsuario= await deletedUsuarioByIdController(usuarioId)
        if(!deletedUsuario){
            return res.status.apply(404).json({error: "Usuario no encontrado"})
        }
        res.status(200).json({message: "Usuario eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    usuarioRouters
}