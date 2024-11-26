import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useRolStore = create((set)=>({
    rols: [],
    addRol: async(rol)=>{
        try {
            const response = await axios.post('http://localhost:3001/rol',rol)
            set((state)=>({rols: [...state.rols, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding user", error.message)
        }
    },
    fetchRols: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/rol')
            set({rols: response.data})
        } catch (error) {
            console.log("Error fecthing rols", error.message)
        }
    },
    deleteRol: async(rolId)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/rol/${rolId}`)
            console.log("rol delete:",response.data)
            set((state)=>({rols: state.rols.filter(rol=>rol.rolId !== rolId)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting rol:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateRol: async (rolId, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/rol/${rolId}`, updatedData)
            console.log("rol updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({rols: state.rols.map((rol)=> rol.rolId === rolId ? {...rol, ...response.data} : rol)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating rol:", error.message)
        }
    }
    
}))

export default useRolStore