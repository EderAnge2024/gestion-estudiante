import { useEffect, useState } from "react"
import useNotaStore from "../../store/NotaStore"
import NavegadorLogin from "../navegador/navegadorLogin"

const VerNotaList = ()=>{
    const {fetchNotas,notas} = useNotaStore()
    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchNotas()
    },[])

    return (
        <div>
            <div><NavegadorLogin></NavegadorLogin></div>
        <div>
            
            <div>
                <h1>Nota List</h1>

                <div>
                    {
                        notas.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.curso_id} {user.student_id} {user.fecha_ingre_nota} {user.nota}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        </div>
    )
}

export default VerNotaList
