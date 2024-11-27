import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const usePeriodoAcademicoStore = create((set)=>({
    periodoAcademicos: [],
    docentes:{},
    addPeriodoAcademico: async(periodoAcademico)=>{
        try {
            const response = await axios.post('http://localhost:3001/periodoAcademico',periodoAcademico)
            set((state)=>({periodoAcademicos: [...state.periodoAcademicos, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding user", error.message)
        }
    },
    fetchPeriodoAcademicos: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/periodoAcademico')
            set({periodoAcademicos: response.data})
        } catch (error) {
            console.log("Error fecthing periodoAcademicos", error.message)
        }
    },
    deletePeriodoAcademico: async(periodoAcademicoId)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/periodoAcademico/${periodoAcademicoId}`)
            console.log("periodoAcademico delete:",response.data)
            set((state)=>({periodoAcademicos: state.periodoAcademicos.filter(periodoAcademico=>periodoAcademico.periodoAcademicoId !== periodoAcademicoId)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting periodoAcademico:", error.message)
        }
    },
    //____----------Agregado---------------________
    updatePeriodoAcademico: async (periodoAcademicoId, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/periodoAcademico/${periodoAcademicoId}`, updatedData)
            console.log("periodoAcademico updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({periodoAcademicos: state.periodoAcademicos.map((periodoAcademico)=> periodoAcademico.periodoAcademicoId === periodoAcademicoId ? {...periodoAcademico, ...response.data} : periodoAcademico)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating periodoAcademico:", error.message)
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

export default usePeriodoAcademicoStore