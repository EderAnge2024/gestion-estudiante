import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useDocenteStore = create((set)=>({
    docentes: [],
    addDocente: async(docente)=>{
        try {
            const response = await axios.post('http://localhost:3001/docente',docente)
            set((state)=>({docentes: [...state.docentes, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding user", error.message)
        }
    },
    fetchDocentes: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/docente')
            set({docentes: response.data})
        } catch (error) {
            console.log("Error fecthing docentes", error.message)
        }
    },
    deleteDocente: async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/docente/${id}`)
            console.log("Docente delete:",response.data)
            set((state)=>({docentes: state.docentes.filter(docente=>docente.id !== id)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting docente:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateDocente: async (id, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/docente/${id}`, updatedData)
            console.log("Docente updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({docentes: state.docentes.map((docente)=> docente.id === id ? {...docente, ...response.data} : docente)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating student:", error.message)
        }
    }
    
}))

export default useDocenteStore