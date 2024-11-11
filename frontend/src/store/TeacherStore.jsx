import {create} from "zustand"
import axios from "axios"

const useTeacherStore = create((set)=>({
    teachers: [],
    addTeacher: async (teacher) => {
        try {
            const response = await axios.post("http://localhost:3001/teacher",teacher)
            set((state) => ({teachers: [...state.teachers, response.data]}))

        } catch (error) {
            console.log("error adding user",error.message);
            
        }
    },
    fetchTeachers: async () =>{
        try {
            const response = await axios.get("http://localhost:3001/teacher")
            set({teachers: response.data})
        } catch (error){
            console.log("Error fetching teacher",error.message)
        }
    },
    deleteTeacher: async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/teacher/${id}`)
            console.log("Teacher deleted:",response.data)
            set((state)=>(
                {teachers: state.teachers.filter((teacher) => teacher.id !== id)}
            ))         
            
        } catch (error) {
            console.log("Error deleting teacher",error.message)
            
        }
    }
 
}))
export default useTeacherStore;

