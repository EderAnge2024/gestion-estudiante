import { useState } from "react"
import axios from 'axios'
import useMatriculaStore from "../../store/MatriculaStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import style from './MatriculaForm.module.css'


const MatriculaForm = ()=>{
    const {addMatricula} = useMatriculaStore()

    const [matriculaData, setMatriculaData] = useState({
        fecha:"",
        carrera:"",
        studentId:"",
        gestionGrupoId:"",
        periodoAcademicoId:""
    
    
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
            studentId:"",
            gestionGrupoId:"",
            periodoAcademicoId:""
        })
        alert("matricula added successfully")
       
    }

    return(
        <div className={style.container}>
        <div><NavegadorMenu></NavegadorMenu></div>
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
            placeholder="Enter studentId"
            required
            name="studentId"
            value={matriculaData.studentId}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter gestionGrupoId"
            required
            name="gestionGrupoId"
            value={matriculaData.gestionGrupoId}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter periodoAcademicoId"
            required
            name="periodoAcademicoId"
            value={matriculaData.periodoAcademicoId}
            onChange={handleInputchange}
            />
            <button>save</button>
        </form>
    </div>
)
}
export default MatriculaForm

