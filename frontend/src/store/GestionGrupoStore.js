import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useGestionGrupoStore = create((set)=>({
    actividad: [],
    addcgestiongrupo: async(course)=>{
        try {
            const response = await axios.post('http://localhost:3001/gestiongrupo',gestiongrupo)
            set((state)=>({course: [...state.gestiongrupo, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding GestionGrupo", error.message)
        }
    },
    fetchgestiongrupo: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/gestiongrupo')
            set({course: response.data})
        } catch (error) {
            console.log("Error fecthing Gestiongrupo", error.message)
        }
    },
    deletegestiongrupo: async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/gestiongrupo/${id}`)
            console.log("gestiongrupo delete:",response.data)
            set((state)=>({gestiongrupo: state.gestiongrupo.filter(gestiongrupo=>gestiongrupo.id !== id)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting gestiongrupo:", error.message)
        }
    },
    //____----------Agregado---------------________
    updategestiongrupo: async (id, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/gestiongrupo/${id}`, updatedData)
            console.log("gestiongrupo updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({gestiongrupo: state.gestiongrupo.map((gestiongrupo)=> gestiongrupo.id === id ? {...gestiongrupo, ...response.data} : gestiongrupo)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating gestiongrupo:", error.message)
        }
    }
    
}))

export default useGestionGrupoStore