import { useState } from "react"
import axios from 'axios'
import usePermisoStore from "../../store/PermisoStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const PermisoFrom = ()=>{
    const {addPermiso} = usePermisoStore()

    const [permisoData, setPermisoData] = useState({
        rolId:"",
        accion:"",
        descripcion:""
    });
    console.log(permisoData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setPermisoData({
            ...permisoData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addPermiso(permisoData)
        setPermisoData({
            rolId:"",
            accion:"",
            descripcion:""
        })
        alert("permiso added successfully")
       
    }

    return(
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
            <h1>Student Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter rolId"
                required
                name="rolId"
                value={permisoData.rolId}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter accion"
                required
                name="accion"
                value={permisoData.accion}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter descripcion"
                required
                name="descripcion"
                value={permisoData.descripcion}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default PermisoFrom