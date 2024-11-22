import { useState } from "react"
import axios from 'axios'
import useRolStore from "../../store/RolStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const RolFrom = ()=>{
    const {addRol} = useRolStore()

    const [rolData, setRolData] = useState({
        usuarioId:"",
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
            usuarioId:"",
            rol:""
        })
        alert("rol added successfully")
       
    }

    return(
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
            <h1>Rol Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter usuarioId"
                required
                name="usuarioId"
                value={rolData.usuarioId}
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