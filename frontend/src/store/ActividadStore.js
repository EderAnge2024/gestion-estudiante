import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useActividadStore = create((set)=>({
    actividads: [],
    addActividad: async(actividad)=>{
        try {
            const response = await axios.post('http://localhost:3001/actividad',actividad)
            set((state)=>({actividads: [...state.actividads, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding Actividad", error.message)
        }
    },
    fetchActividads: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/actividad')
            set({actividads: response.data})
        } catch (error) {
            console.log("Error fecthing actividads", error.message)
        }
    },
    deleteActividad: async(actividadId)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/actividad/${actividadId}`)
            console.log("actividad delete:",response.data)
            set((state)=>({actividads: state.actividads.filter(actividad=>actividad.actividadId !== actividadId)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting actividad:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateActividad: async (actividadId, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/actividad/${actividadId}`, updatedData)
            console.log("actividad updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({actividads: state.actividads.map((actividad)=> actividad.actividadId === actividadId ? {...actividad, ...response.data} : actividad)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating gestionAula:", error.message)
        }
    }
    
}))

export default useActividadStore