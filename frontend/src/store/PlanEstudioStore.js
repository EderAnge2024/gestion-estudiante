import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const usePlanEstudioStore = create((set)=>({
    planEstudios: [],
    students:{},
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
    deletePlanEstudio: async(planEstudioId)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/planEstudio/${planEstudioId}`)
            console.log("planEstudio delete:",response.data)
            set((state)=>({planEstudios: state.planEstudios.filter(planEstudio=>planEstudio.planEstudioId !== planEstudioId)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting planEstudio:", error.message)
        }
    },
    //____----------Agregado---------------________
    updatePlanEstudio: async (planEstudioId, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/planEstudio/${planEstudioId}`, updatedData)
            console.log("planEstudio updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({planEstudios: state.planEstudios.map((planEstudio)=> planEstudio.planEstudioId === planEstudioId ? {...planEstudio, ...response.data} : planEstudio)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating planEstudio:", error.message)
        }
    },
    // Obtener students desde la API
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

export default usePlanEstudioStore