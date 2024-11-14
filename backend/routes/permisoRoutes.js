const {Router}= require('express')
const {createPermisoController,getAllPermisosController, updatePermisoByIdController,deletedPermisoByIdController} = require('../controllers/permisoControllers')
const { Permiso } = require('../models')
const permisoRouters = Router()
// create nuew student
// post = publicar, get= obtner, put= actualizar y delete= eliminar
permisoRouters.post("/",async(req, res)=>{
    const {id, rol_id,accion,descripcion} = req.body
    try {
        const newPermiso = await createPermisoController({id, rol_id,accion,descripcion})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newPermiso)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
permisoRouters.get("/",async(req,res)=>{
    try {
        const permisos = await getAllPermisosController()
        res.status(200).json(permisos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
permisoRouters.put("/:id", async(req,res)=>{
    const {id}= req.params
    const permisoData= req.body
    try {
        const updatePermiso = await updatePermisoByIdController(id, permisoData)
        if(!updatePermiso){
            return res.status(404).json({error: "studiante no encontrado"})
        }
        res.status(200).json(updatePermiso)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

permisoRouters.delete("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const deletedPermiso = await deletedPermisoByIdController(id)
        if(!deletedPermiso){
            return res.status.apply(404).json({error: "Studiante no encontrado"})
        }
        res.status(200).json({message: "Estudiante eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    permisoRouters
}