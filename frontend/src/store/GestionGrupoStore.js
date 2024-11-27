import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useGestionGrupoStore = create((set)=>({
    gestionGrupos: [],
    docentes:{},
    periodoAcademicos:{},
    courses:{},
    addGestionGrupo: async(gestiongrupo)=>{
        try {
            const response = await axios.post('http://localhost:3001/gestionGrupo',gestiongrupo)
            set((state)=>({gestionGrupos: [...state.gestionGrupos, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding gestionGrupos", error.message)
        }
    },
    fetchGestionGrupos: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/gestionGrupo')
            set({gestionGrupos: response.data})
        } catch (error) {
            console.log("Error fecthing gestionGrupos", error.message)
        }
    },
    deleteGestionGrupo: async(gestionGrupoId)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/gestionGrupo/${gestionGrupoId}`)
            console.log("gestiongrupo delete:",response.data)
            set((state)=>({gestionGrupos: state.gestionGrupos.filter(gestiongrupo=>gestiongrupo.gestionGrupoId !== gestionGrupoId)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting gestiongrupo:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateGestionGrupo: async (gestionGrupoId, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/gestionGrupo/${gestionGrupoId}`, updatedData)
            console.log("gestiongrupo updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({gestionGrupos: state.gestionGrupos.map((gestiongrupo)=> gestiongrupo.gestionGrupoId === gestionGrupoId ? {...gestiongrupo, ...response.data} : gestiongrupo)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating gestiongrupo:", error.message)
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
    
}))

export default useGestionGrupoStore