import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useCourseStore = create((set)=>({
    courses: [],
    addCourse: async(course)=>{
        try {
            const response = await axios.post('http://localhost:3001/course',course)
            set((state)=>({courses: [...state.courses, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding Course", error.message)
        }
    },
    fetchCourses: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/course')
            set({courses: response.data})
        } catch (error) {
            console.log("Error fecthing courses", error.message)
        }
    },
    deleteCourse: async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/course/${id}`)
            console.log("course delete:",response.data)
            set((state)=>({courses: state.courses.filter(course=>course.id !== id)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting course:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateCourse: async (id, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/course/${id}`, updatedData)
            console.log("course updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({courses: state.courses.map((course)=> course.id === id ? {...course, ...response.data} : course)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating course:", error.message)
        }
    }
    
}))

export default useCourseStore