import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useCourseStore = create((set)=>({
    actividad: [],
    addcourse: async(course)=>{
        try {
            const response = await axios.post('http://localhost:3001/course',course)
            set((state)=>({course: [...state.course, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding Course", error.message)
        }
    },
    fetchcourse: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/course')
            set({course: response.data})
        } catch (error) {
            console.log("Error fecthing Course", error.message)
        }
    },
    deletecourse: async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/course/${id}`)
            console.log("course delete:",response.data)
            set((state)=>({course: state.course.filter(course=>course.id !== id)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting course:", error.message)
        }
    },
    //____----------Agregado---------------________
    updatecourse: async (id, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/course/${id}`, updatedData)
            console.log("course updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({course: state.course.map((course)=> course.id === id ? {...course, ...response.data} : course)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating course:", error.message)
        }
    }
    
}))

export default useCourseStore