import { useEffect } from "react"
import useStudentStore from "../../store/StudentStore"


const StudentList =()=>{
    const { fetchStudents,students, deleteStudent,editStudent } = useStudentStore()
    useEffect(() => {
        fetchStudents()
    },[])
    const handleDelete =(dni)=>{
        if(window.confirm("are you sure?")){
            deleteStudent(dni)
        }
       
    }
    return (
        <div>
            <h1>Student List</h1>{students.map((user) =>{
                    return (
                        <div>
                            <h3>{user.nombre} {user.apellido}</h3>
                            <button onClick={() => editStudent(user.dni,user.student)}>⛏️</button>
                            <button onClick={() => handleDelete(user.dni)}>✖️</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default StudentList