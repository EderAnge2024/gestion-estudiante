import { useEffect } from "react"
import useUserStore from "../../store/UserStore"


const UserList =()=>{
    const { fetchUser,users, deleteUser,editUser } = useUserStore()
    useEffect(() => {
        fetchUser()
    },[])
    const handleDelete =(id)=>{
        if(window.confirm("are you sure?")){
            deleteUser(id)
        }
       
    }
    return (
        <div>
            <h1>Student List</h1>{users.map((user) =>{
                    return (
                        <div>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <button onClick={() => editUser(user.id,user.student)}>⛏️</button>
                            <button onClick={() => handleDelete(user.id)}>✖️</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default UserList