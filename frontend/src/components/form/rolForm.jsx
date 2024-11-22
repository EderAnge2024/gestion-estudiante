import { useState } from "react"
// import axios from 'axios'
import useRolStore from "../../store/RolStore";
import Navegador from "../navegador/Navegador";

const RolFrom = ()=>{
    const {addRol} = useRolStore()

    const [rolData, setRolData] = useState({
        usuario_id:"",
        rol:""
    });
    console.log(rolData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setRolData({
            ...rolData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addRol(rolData)
        setRolData({
            usuario_id:"",
            rol:""
        })
        alert("rol added successfully")
       
    }

    return(
        <div>
            <div><Navegador></Navegador></div>
            <h1>Rol Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter usuario_id"
                required
                name="usuario_id"
                value={rolData.usuario_id}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter rol"
                required
                name="rol"
                value={rolData.rol}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default RolFrom