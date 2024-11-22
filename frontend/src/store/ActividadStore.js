import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useActividadStore = create((set)=>({
    actividad: [],
    addActividad: async(actividad)=>{
        try {
            const response = await axios.post('http://localhost:3001/actividad',actividad)
            set((state)=>({actividad: [...state.actividad, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding Actividad", error.message)
        }
    },
    fetchActividad: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/actividad')
            set({actividad: response.data})
        } catch (error) {
            console.log("Error fecthing Actividad", error.message)
        }
    },
    deleteActividad: async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/actividad/${id}`)
            console.log("actividad delete:",response.data)
            set((state)=>({actividad: state.actividad.filter(actividad=>actividad.id !== id)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting actividad:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateActividad: async (id, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/actividad/${id}`, updatedData)
            console.log("actividad updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({actividad: state.actividad.map((actividad)=> actividad.id === id ? {...actividad, ...response.data} : actividad)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating gestionAula:", error.message)
        }
    }
    
}))

export default useActividadStore