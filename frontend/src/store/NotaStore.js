import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useNotaStore = create((set)=>({
    notas: [],
    courses:{},
    students:{},
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
    deleteNota: async(notaId)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/nota/${notaId}`)
            console.log("Nota delete:",response.data)
            set((state)=>({notas: state.notas.filter(nota=>nota.notaId !== notaId)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting nota:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateNota: async (notaId, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/nota/${notaId}`, updatedData)
            console.log("Nota updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({notas: state.notas.map((nota)=> nota.notaId === notaId ? {...nota, ...response.data} : nota)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating student:", error.message)
        }
    },

    //----------obtiene las notas de los estudiantes con sus nombres-------
    fetchNotasStudent: async () => {
        set({ loading: true, error: null }); // Inicia el estado de carga y limpia posibles errores
        try {
          const response = await fetch(`http://localhost:3001/detalles/nota`); // Asegúrate de que esta ruta es la correcta
          if (!response.ok) {
            throw new Error("No se pudo obtener las notas");
          }
          const data = await response.json();
          
          // Actualiza el estado con los datos obtenidos
          set({ notas: data, loading: false });
        } catch (error) {
          console.error("Error al obtener las notas:", error);
          set({ error: error.message, loading: false });
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

export default useNotaStore