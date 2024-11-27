import { useState } from "react"
// import axios from 'axios'
import NavegadorMenu from "../navegador/NavegadorMenu";
import useGestionGrupoStore from "../../store/GestionGrupoStore"

const GestionGrupoForm = ()=>{
    const {addGestionGrupo} = useGestionGrupoStore()

    const [gestionGrupoData, setGestionGrupoData] = useState({
        courseId:"",
        docenteId:"",
        periodoAcademicoId:""
    });
    console.log(gestionGrupoData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setGestionGrupoData({
            ...gestionGrupoData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addGestionGrupo(gestionGrupoData)
        setGestionGrupoData({
            courseId:"",
            docenteId:"",
            periodoAcademicoId:""  
        })
        alert("GestionGrupo added successfully")
       
    }

    return(
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
            <h1>GestionGrupo Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter courseId"
                required
                name="courseId"
                value={gestionGrupoData.courseId}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter docenteId"
                required
                name="docenteId"
                value={gestionGrupoData.docenteId}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter periodoAcademicoId"
                required
                name="periodoAcademicoId"
                value={gestionGrupoData.periodoAcademicoId}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default GestionGrupoForm