import { useState } from "react"
import axios from 'axios'
import useDocenteStore from "../../store/DocenteStore";
import Navegador from "../navegador/Navegador";

const DocenteForm = ()=>{
    const {addDocente} = useDocenteStore()

    const [docenteData, setDocenteData] = useState({
        nombre:"",
        apellido:"",
        telefono:"",
        direccion:"",
        email:""
    
    
    });
    console.log(docenteData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setDocenteData({
            ...docenteData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addDocente(docenteData)
        setDocenteData({
            
            nombre:"",
            apellido:"",
            telefono:"",
            direccion:"",
            email:""
        })
        alert("docente added successfully")
       
    }

    return(
        <div>
        <div><Navegador></Navegador></div>
        <h1>Docente Form</h1>
        <form 
        onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Enter nombre"
            required
            name="nombre"
            value={docenteData.nombre}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter apellido"
            required
            name="apellido"
            value={docenteData.apellido}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter telefono"
            required
            name="telefono"
            value={docenteData.telefono}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter direccion"
            required
            name="direccion"
            value={docenteData.direccion}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter email"
            required
            name="email"
            value={docenteData.email}
            onChange={handleInputchange}
            />
            <button>save</button>
        </form>
    </div>
)
}
export default DocenteForm

