import {create} from "zustand"
import axios from "axios"

const useAulaStore = create((set)=>({
    aulas: [],
    addAula: async (aula) => {
        try {
            const response = await axios.post("http://localhost:3001/gestionAula",aula)
            set((state) => ({aulas: [...state.aulas, response.data]}))

        } catch (error) {
            console.log("error adding user",error.message);
            
        }
    },
    fetchAulas: async () =>{
        try {
            const response = await axios.get("http://localhost:3001/gestionAula")
            set({aulas: response.data})
        } catch (error){
            console.log("Error fetching aula",error.message)
        }
    },
    deleteAula: async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/gestionAula/${id}`)
            console.log("Aula deleted:",response.data)
            set((state)=>(
                {aulas: state.aulas.filter((aula) => aula.id !== id)}
            ))         
            
        } catch (error) {
            console.log("Error deleting aula",error.message)
            
        }
    }
 
}))
export default useAulaStore;

