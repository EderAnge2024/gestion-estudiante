import { useState } from "react"
// import axios from 'axios'
import useActividadStore from "../../store/ActividadStore";
import Navegador from "../navegador/Navegador";

const ActividadForm = ()=>{
    const {addActividad} = useActividadStore()

    const [actividadData, setActividadData] = useState({
        usuario_id:"",
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
            usuario_id:"",
            rol:"",
            accion:"",
            fecha:"",
            descripcion:""
        })
        alert("Actividad added successfully")
       
    }

    return(
        <div>
            <div><Navegador></Navegador></div>
            <h1>Actividad Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter usuario_id"
                required
                name="usuario"
                value={actividadData.usuario_id}
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