import { useState } from "react"
// import axios from 'axios'
import useGestionGrupoStore from "../../store/GestionGrupoStore";
import Navegador from "../navegador/Navegador";

const GestionGrupoForm = ()=>{
    const {addGestionGrupo} = useGestionGrupoStore()

    const [GestionGrupoData, setGestionGrupoData] = useState({
        curso_id:"",
        docente_id:"",
        periodoAcademico_id:""
    });
    console.log(GestionGrupoData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setGestionGrupoData({
            ...GestionGrupoData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addGestionGrupo(GestionGrupoData)
        setGestionGrupoData({
            curso_id:"",
            docente_id:"",
            periodoAcademico_id:""  
        })
        alert("GestionGrupo added successfully")
       
    }

    return(
        <div>
            <div><Navegador></Navegador></div>
            <h1>GestionGrupo Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter curso_id"
                required
                name="curso_id"
                value={GestionGrupoData.curso_id}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter docente_id"
                required
                name="docente_id"
                value={GestionGrupoData.docente_id}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter periodoAcademico_id"
                required
                name="periodoAcademico_id"
                value={GestionGrupoData.periodoAcademico_id}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default GestionGrupoForm