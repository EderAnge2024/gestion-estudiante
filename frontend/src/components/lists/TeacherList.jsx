import { useEffect } from "react"
import useTeacherStore from "../../store/TeacherStore"


const TeacherList =()=>{
    const { fetchTeacher,teachers, deleteTeacher,editTeacher } = useTeacherStore()
    useEffect(() => {
        fetchTeacher()
    },[])
    const handleDelete =(id)=>{
        if(window.confirm("are you sure?")){
            deleteTeacher(id)
        }
       
    }
    return (
        <div>
            <h1>Student List</h1>{teachers.map((user) =>{
                    return (
                        <div>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <button onClick={() => editTeacher(user.id,user.student)}>⛏️</button>
                            <button onClick={() => handleDelete(user.id)}>✖️</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default TeacherList