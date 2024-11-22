import { useState } from "react"
// import axios from 'axios'
import useActividadStore from "../../store/ActividadStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const ActividadForm = ()=>{
    const {addActividad} = useActividadStore()

    const [actividadData, setActividadData] = useState({
        usuarioId:"",
        rol:"",
        accion:"",
        fecha:"",
        descripcion:""
    });
    console.log(actividadData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setActividadData({
            ...actividadData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addActividad(actividadData)
        setActividadData({
            usuarioId:"",
            rol:"",
            accion:"",
            fecha:"",
            descripcion:""
        })
        alert("Actividad added successfully")
       
    }

    return(
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
            <h1>ACTIVIDAD Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter usuarioId"
                required
                name="usuarioId"
                value={actividadData.usuarioId}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter rol"
                required
                name="rol"
                value={actividadData.rol}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter accion"
                required
                name="accion"
                value={actividadData.accion}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter fecha"
                required
                name="fecha"
                value={actividadData.fecha}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter descripcion"
                required
                name="descripcion"
                value={actividadData.descripcion}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default ActividadForm