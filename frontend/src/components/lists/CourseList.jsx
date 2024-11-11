import { useEffect } from "react"
import useCourseStore from "../../store/CourseStore"


const CourseList =()=>{
    const { fetchCourses,courses, deleteCourse,edidCourse } = useCourseStore()
    useEffect(() => {
        fetchCourses()
    },[])
    const handleDelete =(id)=>{
        if(window.confirm("are you sure?")){
            deleteCourse(id)
        }
       
    }
    return (
        <div>
            <h1>Student List</h1>{courses.map((user) =>{
                    return (
                        <div >
                            <h3>{user.nombre} {user.creditos}</h3>
                            <button onClick={() => edidCourse(user.id,user.course)}>⛏️</button>
                            <button onClick={() => handleDelete(user.id)}>✖️</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default CourseList