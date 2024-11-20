import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const usePermisoStore = create((set)=>({
    permisos: [],
    addPermiso: async(permiso)=>{
        try {
            const response = await axios.post('http://localhost:3001/permiso',permiso)
            set((state)=>({permisos: [...state.permisos, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding user", error.message)
        }
    },
    fetchPermisos: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/permiso')
            set({permisos: response.data})
        } catch (error) {
            console.log("Error fecthing permisos", error.message)
        }
    },
    deletePermiso: async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/permiso/${id}`)
            console.log("permiso delete:",response.data)
            set((state)=>({permisos: state.permisos.filter(permiso=>permiso.id !== id)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting permiso:", error.message)
        }
    },
    //____----------Agregado---------------________
    updatePermiso: async (id, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/permiso/${id}`, updatedData)
            console.log("permiso updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({permisos: state.permisos.map((permiso)=> permiso.id === id ? {...permiso, ...response.data} : permiso)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating permiso:", error.message)
        }
    }
    
}))

export default usePermisoStore