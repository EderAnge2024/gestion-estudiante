import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useCourseStore = create((set)=>({
    courses: [],
    planEstudios:{},
    docentes:{},
    addCourse: async(course)=>{
        try {
            const response = await axios.post('http://localhost:3001/course',course)
            set((state)=>({courses: [...state.courses, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding user", error.message)
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
    deleteCourse: async(courseId)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/course/${courseId}`)
            console.log("course delete:",response.data)
            set((state)=>({courses: state.courses.filter(course=>course.courseId !== courseId)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting course:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateCourse: async (courseId, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/course/${courseId}`, updatedData)
            console.log("course updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({courses: state.courses.map((course)=> course.courseId === courseId ? {...course, ...response.data} : course)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating course:", error.message)
        }
    },
    // Obtener planEstudios desde la API
    fetchPlanEstudios: async () => {
        try {
            const response = await axios.get('http://localhost:3001/planEstudio'); // Ajusta la URL según tu API
            const planEstudiosData = response.data.reduce((acc, planEstudio) => {
                acc[planEstudio.planEstudioId] = planEstudio.meta; // Mapea planEstudioId con el nombre del meta
                return acc;
            }, {}); // Transforma la lista de planEstudios en un objeto
            set({ planEstudios: planEstudiosData }); // Actualiza el estado con los planEstudios
        } catch (error) {
            console.log("Error al obtener planEstudios:", error.message);
        }
    },
    fetchDocentes: async () => {
        try {
            const response = await axios.get('http://localhost:3001/docente'); // Ajusta la URL según tu API
            const docentesData = response.data.reduce((acc, docente) => {
                acc[docente.docenteId] = docente.nombre; // Mapea docenteId con el nombre del nombre
                return acc;
            }, {}); // Transforma la lista de docentes en un objeto
            set({ docentes: docentesData }); // Actualiza el estado con los docentes
        } catch (error) {
            console.log("Error al obtener docentes:", error.message);
        }
    },
    
}))

export default useCourseStore