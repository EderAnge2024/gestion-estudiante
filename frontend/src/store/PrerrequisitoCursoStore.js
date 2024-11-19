import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const usePreriquisitoCursoStore = create((set)=>({
    preriquisitoCursos: [],
    addPreriquisitoCurso: async(preriquisitoCurso)=>{
        try {
            const response = await axios.post('http://localhost:3001/preriquisitoCurso',preriquisitoCurso)
            set((state)=>({preriquisitoCursos: [...state.preriquisitoCursos, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding user", error.message)
        }
    },
    fetchPreriquisitoCursos: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/preriquisitoCurso')
            set({preriquisitoCursos: response.data})
        } catch (error) {
            console.log("Error fecthing preriquisitoCursos", error.message)
        }
    },
    deletePreriquisitoCurso: async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/preriquisitoCurso/${id}`)
            console.log("preriquisitoCurso delete:",response.data)
            set((state)=>({preriquisitoCursos: state.preriquisitoCursos.filter(preriquisitoCurso=>preriquisitoCurso.id !== id)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting preriquisitoCurso:", error.message)
        }
    },
    //____----------Agregado---------------________
    updatePreriquisitoCurso: async (id, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/preriquisitoCurso/${id}`, updatedData)
            console.log("preriquisitoCurso updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({preriquisitoCursos: state.preriquisitoCursos.map((preriquisitoCurso)=> preriquisitoCurso.id === id ? {...preriquisitoCurso, ...response.data} : preriquisitoCurso)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating preriquisitoCurso:", error.message)
        }
    }
    
}))

export default usePreriquisitoCursoStore