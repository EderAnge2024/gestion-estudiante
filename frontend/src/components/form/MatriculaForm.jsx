import { useState } from "react"
import axios from 'axios'
import useMatriculaStore from "../../store/MatriculaStore";
import Navegador from "../navegador/Navegador";

const MatriculaForm = ()=>{
    const {addMatricula} = useMatriculaStore()

    const [matriculaData, setMatriculaData] = useState({
        fecha:"",
        carrera:"",
        estudent_id:"",
        grupo_id:"",
        periodoAcademico_id:""
    
    
    });
    console.log(matriculaData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setMatriculaData({
            ...matriculaData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addMatricula(matriculaData)
        setMatriculaData({
            
            fecha:"",
            carrera:"",
            estudent_id:"",
            grupo_id:"",
            periodoAcademico_id:""
        })
        alert("matricula added successfully")
       
    }

    return(
        <div>
        <div><Navegador></Navegador></div>
        <h1>Matricula Form</h1>
        <form 
        onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Enter fecha"
            required
            name="fecha"
            value={matriculaData.fecha}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter carrera"
            required
            name="carrera"
            value={matriculaData.carrera}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter estudent_id"
            required
            name="estudent_id"
            value={matriculaData.estudent_id}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter grupo_id"
            required
            name="grupo_id"
            value={matriculaData.grupo_id}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter periodoAcademico_id"
            required
            name="periodoAcademico_id"
            value={matriculaData.periodoAcademico_id}
            onChange={handleInputchange}
            />
            <button>save</button>
        </form>
    </div>
)
}
export default MatriculaForm

