import {create} from 'zustand'
import axios from 'axios'  // para hacer peticiones

const useUsuarioStore = create((set)=>({
    usuarios: [],
    addUsuario: async(usuario)=>{
        try {
            const response = await axios.post('http://localhost:3001/usuario',usuario)
            set((state)=>({usuarios: [...state.usuarios, response.data]}))// crea una copia el "..."
        } catch (error) {
            console.log("Error adding user", error.message)
        }
    },
    fetchUsuarios: async()=>{
        try {
            const response = await axios.get('http://localhost:3001/usuario')
            set({usuarios: response.data})
        } catch (error) {
            console.log("Error fecthing usuarios", error.message)
        }
    },
    deleteUsuario: async(id)=>{
        try {
            const response = await axios.delete(`http://localhost:3001/usuario/${id}`)
            console.log("usuario delete:",response.data)
            set((state)=>({usuarios: state.usuarios.filter(usuario=>usuario.id !== id)})) // filtra todos lo estudiantes actualizados o
        } catch (error) {                                                               // diferentes del id eliminado
            console.log("Error deleting usuario:", error.message)
        }
    },
    //____----------Agregado---------------________
    updateUsuario: async (id, updatedData) => {
        try {  // Realiza una solicitud PUT para actualizar el estudiante en el servidor.
            const response = await axios.put(`http://localhost:3001/usuario/${id}`, updatedData)
            console.log("usuario updated:", response.data)
            // Actualiza el estado localmente, modificando solo el estudiante con el id coincidente.
            set((state) => ({usuarios: state.usuarios.map((usuario)=> usuario.id === id ? {...usuario, ...response.data} : usuario)})) // actualiza el estudiante en el estado
        } catch (error) {
            console.log("Error updating usuario:", error.message)
        }
    }
    
}))

export default useUsuarioStore