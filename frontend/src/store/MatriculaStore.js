import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useMatriculaStore = create((set)=>({
    matriculas: [],
    students:{},
    periodoAcademicos:{},
    gestionGrupos:{},
    addMatricula: async(matricula)=>{
        try {
            const response = await axios.post('http://localhost:3001/matricula',matricula)
            set((state)=>({matriculas: [...state.matriculas, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding user", error.message)
        }
    },
    fetchMatriculas: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/matricula')
            set({matriculas: response.data})
        } catch (error) {
            console.log("Error fecthing matriculas", error.message)
        }
    },
    deleteMatricula: async(matriculaId)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/matricula/${matriculaId}`)
            console.log("Matricula delete:",response.data)
            set((state)=>({matriculas: state.matriculas.filter(matricula=>matricula.matriculaId !== matriculaId)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting matricula:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateMatricula: async (matriculaId, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/matricula/${matriculaId}`, updatedData)
            console.log("Matricula updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({matriculas: state.matriculas.map((matricula)=> matricula.matriculaId === matriculaId ? {...matricula, ...response.data} : matricula)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating matricula:", error.message)
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
    fetchPeriodoAcademicos: async () => {
        try {
            const response = await axios.get('http://localhost:3001/periodoAcademico'); // Ajusta la URL según tu API
            const periodoAcademicosData = response.data.reduce((acc, periodoAcademico) => {
                acc[periodoAcademico.periodoAcademicoId] = periodoAcademico.ciclo; // Mapea periodoAcademicoId con el ciclo del nombre
                return acc;
            }, {}); // Transforma la lista de periodoAcademicos en un objeto
            set({ periodoAcademicos: periodoAcademicosData }); // Actualiza el estado con los periodoAcademicos
        } catch (error) {
            console.log("Error al obtener periodoAcademicos:", error.message);
        }
    },
    
    fetchGestionGrupos: async () => {
        try {
            const response = await axios.get('http://localhost:3001/gestionGrupo'); // Ajusta la URL según tu API
            const gestionGruposData = response.data.reduce((acc, gestionGrupo) => {
                acc[gestionGrupo.gestionGrupoId] = gestionGrupo.gestionGrupoId; // Mapea gestionGrupoId con el gestionGrupoId del nombre
                return acc;
            }, {}); // Transforma la lista de gestionGrupos en un objeto
            set({ gestionGrupos: gestionGruposData }); // Actualiza el estado con los gestionGrupos
        } catch (error) {
            console.log("Error al obtener gestionGrupos:", error.message);
        }
    },
    
}))

export default useMatriculaStore