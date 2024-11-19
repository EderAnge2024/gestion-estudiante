import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const usePlanEstudioStore = create((set)=>({
    planEstudios: [],
    addPlanEstudio: async(planEstudio)=>{
        try {
            const response = await axios.post('http://localhost:3001/planEstudio',planEstudio)
            set((state)=>({planEstudios: [...state.planEstudios, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding user", error.message)
        }
    },
    fetchPlanEstudios: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/planEstudio')
            set({planEstudios: response.data})
        } catch (error) {
            console.log("Error fecthing planEstudios", error.message)
        }
    },
    deletePlanEstudio: async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/planEstudio/${id}`)
            console.log("planEstudio delete:",response.data)
            set((state)=>({planEstudios: state.planEstudios.filter(planEstudio=>planEstudio.id !== id)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting planEstudio:", error.message)
        }
    },
    //____----------Agregado---------------________
    updatePlanEstudio: async (id, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/planEstudio/${id}`, updatedData)
            console.log("planEstudio updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({planEstudios: state.planEstudios.map((planEstudio)=> planEstudio.id === id ? {...planEstudio, ...response.data} : planEstudio)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating planEstudio:", error.message)
        }
    }
    
}))

export default usePlanEstudioStore