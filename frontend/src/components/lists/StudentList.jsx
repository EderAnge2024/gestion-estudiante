import { useEffect } from "react"
import useStudentStore from "../../store/StudentStore"


const StudentList =()=>{
    const { fetchStudents,students, deleteStudent,editStudent } = useStudentStore()
    useEffect(() => {
        fetchStudents()
    },[])
    const handleDelete =(id)=>{
        if(window.confirm("are you sure?")){
            deleteStudent(id)
        }
       
    }
    return (
        <div>
            <h1>Student List</h1>{students.map((user) =>{
                    return (
                        <div>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <button onClick={() => editStudent(user.id,user.student)}>⛏️</button>
                            <button onClick={() => handleDelete(user.id)}>✖️</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default StudentList