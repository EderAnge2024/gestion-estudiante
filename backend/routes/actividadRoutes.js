const {Router}= require('express')
const {createActividadController,getAllActividadsController, updateActividadByIdController,deletedActividadByIdController} = require('../controllers/actividadControllers')
const { Actividad } = require('../models')
const actividadRouters = Router()
// create nuew Actividad
// post = publicar, get= obtner, put= actualizar y delete= eliminar
actividadRouters.post("/",async(req, res)=>{
    const {id, usuario_id, rol, accion, fecha, descripcion} = req.body
    try {
        const newActividad = await createActividadController({id, usuario_id, rol, accion, fecha, descripcion})
        // 201 se maneja en servidor que dice que todo salio bien
        res.status(201).json(newActividad)
    } catch (error) {
        res.status(400).json({error: error. message})       
    }
}) 
// creamo la ruta para ver todos los estudiantes get
actividadRouters.get("/",async(req,res)=>{
    try {
        const actividads = await getAllActividadsController()
        res.status(200).json(actividads)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// para actualizar update
actividadRouters.put("/:id", async(req,res)=>{
    const {id}= req.params
    const actividadData= req.body
    try {
        const updateActividad = await updateActividadByIdController(id, actividadData)
        if(!updateActividad){
            return res.status(404).json({error: "studiante no encontrado"})
        }
        res.status(200).json(updateActividad)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

actividadRouters.delete("/:id", async(req, res)=>{
    const {id} = req.params
    try {
        const deletedActividad = await deletedActividadByIdController(id)
        if(!deletedActividad){
            return res.status.apply(404).json({error: "Studiante no encontrado"})
        }
        res.status(200).json({message: "Estudiante eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    actividadRouters
}