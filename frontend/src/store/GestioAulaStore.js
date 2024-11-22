import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useGestionAulaStore = create((set)=>({
    gestionAulas: [],
    addGestionAula: async(gestionAula)=>{
        try {
            const response = await axios.post('http://localhost:3001/gestionAula',gestionAula)
            set((state)=>({gestionAulas: [...state.gestionAulas, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding user", error.message)
        }
    },
    fetchGestionAulas: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/gestionAula')
            set({gestionAulas: response.data})
        } catch (error) {
            console.log("Error fecthing gestionAulas", error.message)
        }
    },
    deleteGestionAula: async(gestionAulaId)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/gestionAula/${gestionAulaId}`)
            console.log("gestionAula delete:",response.data)
            set((state)=>({gestionAulas: state.gestionAulas.filter(gestionAula=>gestionAula.gestionAulaId !== gestionAulaId)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting gestionAula:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateGestionAula: async (gestionAulaId, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/gestionAula/${gestionAulaId}`, updatedData)
            console.log("gestionAula updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({gestionAulas: state.gestionAulas.map((gestionAula)=> gestionAula.gestionAulaId === gestionAulaId ? {...gestionAula, ...response.data} : gestionAula)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating gestionAula:", error.message)
        }
    }
    
}))

export default useGestionAulaStore