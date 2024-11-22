const {Router}= require('express')
const {createActividadController,getAllActividadsController, updateActividadByIdController,deletedActividadByIdController} = require('../controllers/actividadControllers')
const { Actividad } = require('../models')
const actividadRouters = Router()
// create nuew Actividad
// post = publicar, get= obtner, put= actualizar y delete= eliminar
actividadRouters.post("/",async(req, res)=>{
    const {actividadId, usuarioId, rol, accion, fecha, descripcion} = req.body
    try {
        const newActividad = await createActividadController({actividadId, usuarioId, rol, accion, fecha, descripcion})
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
actividadRouters.put("/:actividadId", async(req,res)=>{
    const {actividadId}= req.params
    const actividadData= req.body
    try {
        const updateActividad = await updateActividadByIdController(actividadId, actividadData)
        if(!updateActividad){
            return res.status(404).json({error: "studiante no encontrado"})
        }
        res.status(200).json(updateActividad)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

// delete o eliminar

actividadRouters.delete("/:actividadId", async(req, res)=>{
    const {actividadId} = req.params
    try {
        const deletedActividad = await deletedActividadByIdController(actividadId)
        if(!deletedActividad){
            return res.status.apply(404).json({error: "actividad no encontrado"})
        }
        res.status(200).json({message: "actividad eliminado existozamente"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports={
    actividadRouters
}