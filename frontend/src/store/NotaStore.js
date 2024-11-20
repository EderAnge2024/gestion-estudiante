import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useNotaStore = create((set)=>({
    notas: [],
    addNota: async(nota)=>{
        try {
            const response = await axios.post('http://localhost:3001/nota',nota)
            set((state)=>({notas: [...state.notas, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding user", error.message)
        }
    },
    fetchNotas: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/nota')
            set({notas: response.data})
        } catch (error) {
            console.log("Error fecthing notas", error.message)
        }
    },
    deleteNota: async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/nota/${id}`)
            console.log("Nota delete:",response.data)
            set((state)=>({notas: state.notas.filter(nota=>nota.id !== id)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting nota:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateNota: async (id, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/nota/${id}`, updatedData)
            console.log("Nota updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({notas: state.notas.map((nota)=> nota.id === id ? {...nota, ...response.data} : nota)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating student:", error.message)
        }
    }
    
}))

export default useNotaStore