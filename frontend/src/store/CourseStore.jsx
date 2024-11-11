import {create} from "zustand"
import axios from "axios"

const useCourseStore = create((set)=>({
    courses: [],
    addCourse: async (course) => {
        try {
            const response = await axios.post("http://localhost:3001/course",course)
            set((state) => ({courses: [...state.courses, response.data]}))

        } catch (error) {
            console.log("error adding course",error.message);
            
        }
    },
    fetchCourses: async () =>{
        try {
            const response = await axios.get("http://localhost:3001/course")
            set({courses: response.data})
        } catch (error){
            console.log("Error fetching course",error.message)
        }
    },
    deleteCourse: async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/course/${id}`)
            console.log("Course deleted:",response.data)
            set((state)=>(
                {courses: state.courses.filter((course) => course.id !== id)}
            ))         
            
        } catch (error) {
            console.log("Error deleting course",error.message)
            
        }
    }
 
}))
export default useCourseStore;

