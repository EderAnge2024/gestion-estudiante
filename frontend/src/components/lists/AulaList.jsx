import { useEffect } from "react"
import useAulaStore from "../../store/AulaStore"


const AulaList =()=>{
    const { fetchList,aulas, deleteAula,edidAula } = useAulaStore()
    useEffect(() => {
        fetchList()
    },[])
    const handleDelete =(id)=>{
        if(window.confirm("are you sure?")){
            deleteAula(id)
        }
       
    }
    return (
        <div>
            <h1>Student List</h1>{aulas.map((user) =>{
                    return (
                        <div className={Style.container}>
                            <h3>{user.firstName} {user.lastName}</h3>
                            <button onClick={() => edidAula(user.id,user.student)}>⛏️</button>
                            <button onClick={() => handleDelete(user.id)}>✖️</button>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default AulaList