import {create} from "zustand"
import axios from "axios"

const useUserStore = create((set)=>({
    users: [],
    addUser: async (user) => {
        try {
            const response = await axios.post("http://localhost:3001/user",user)
            set((state) => ({users: [...state.users, response.data]}))

        } catch (error) {
            console.log("error adding user",error.message);
            
        }
    },
    fetchUsers: async () =>{
        try {
            const response = await axios.get("http://localhost:3001/user")
            set({users: response.data})
        } catch (error){
            console.log("Error fetching user",error.message)
        }
    },
    deleteuser: async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/user/${id}`)
            console.log("user deleted:",response.data)
            set((state)=>(
                {users: state.users.filter((user) => user.id !== id)}
            ))         
            
        } catch (error) {
            console.log("Error deleting user",error.message)
            
        }
    }
 
}))
export default useUserStore;

