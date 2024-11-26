import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const usePreriquisitoCursoStore = create((set)=>({
    preriquisitoCursos: [],
    students:{},
    courses:{},
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
    deletePreriquisitoCurso: async(preriquisitoCursoId)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/preriquisitoCurso/${preriquisitoCursoId}`)
            console.log("preriquisitoCurso delete:",response.data)
            set((state)=>({preriquisitoCursos: state.preriquisitoCursos.filter(preriquisitoCurso=>preriquisitoCurso.preriquisitoCursoId !== preriquisitoCursoId)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting preriquisitoCurso:", error.message)
        }
    },
    //____----------Agregado---------------________
    updatePreriquisitoCurso: async (preriquisitoCursoId, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/preriquisitoCurso/${preriquisitoCursoId}`, updatedData)
            console.log("preriquisitoCurso updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({preriquisitoCursos: state.preriquisitoCursos.map((preriquisitoCurso)=> preriquisitoCurso.preriquisitoCursoId === preriquisitoCursoId ? {...preriquisitoCurso, ...response.data} : preriquisitoCurso)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating preriquisitoCurso:", error.message)
        }
    },
    // Obtener students desde la API
    fetchCourses: async () => {
        try {
            const response = await axios.get('http://localhost:3001/course'); // Ajusta la URL según tu API
            const coursesData = response.data.reduce((acc, course) => {
                acc[course.courseId] = course.nombre; // Mapea courseId con el nombre del nombre
                return acc;
            }, {}); // Transforma la lista de courses en un objeto
            set({ courses: coursesData }); // Actualiza el estado con los courses
        } catch (error) {
            console.log("Error al obtener courses:", error.message);
        }
    },
    fetchStudents: async () => {
        try {
            const response = await axios.get('http://localhost:3001/student'); // Ajusta la URL según tu API
            const studentsData = response.data.reduce((acc, student) => {
                acc[student.studentId] = student.nombre; // Mapea studentId con el nombre del nombre
                return acc;
            }, {}); // Transforma la lista de students en un objeto
            set({ students: studentsData }); // Actualiza el estado con los students
        } catch (error) {
            console.log("Error al obtener students:", error.message);
        }
    },
    
    
}))

export default usePreriquisitoCursoStore