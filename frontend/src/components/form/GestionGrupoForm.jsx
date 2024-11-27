import { useState,useEffect } from "react"
import axios from 'axios'
import NavegadorMenu from "../navegador/NavegadorMenu";
import useGestionGrupoStore from "../../store/GestionGrupoStore"
import stilo from "./stilo.module.css";

const GestionGrupoForm = ()=>{
    const {addGestionGrupo} = useGestionGrupoStore()
    const [docentes, setDocentes] = useState([]);
    const [courses,setCourses] = useState([])
    const [periodoAcademicos,setPeriodoAcademicos] = useState([])
    const [gestionGrupoData, setGestionGrupoData] = useState({
        courseId:"",
        docenteId:"",
        periodoAcademicoId:""
    });
    console.log(gestionGrupoData);

    useEffect(() => {
        const fetchUsuarios = async () => {
          try {
            const [docentesResponse, coursesResponse,periodoAcademicoResponse] = await Promise.all([
              axios.get("http://localhost:3001/docente"),
              axios.get("http://localhost:3001/course"),
              axios.get("http://localhost:3001/periodoAcademico"),
            ]);
    
            console.log("Docentes:", docentesResponse.data);
            console.log("PlanEstudios:", coursesResponse.data);
            console.log("PeriodoAcademico:", periodoAcademicoResponse.data);
    
            setDocentes(docentesResponse.data);
            setCourses(coursesResponse.data);
            setPeriodoAcademicos(periodoAcademicoResponse.data);
          } catch (error) {
            console.error("Error al obtener los usuarios:", error);
          }
        };
    
        fetchUsuarios();
      }, []);

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
        <div className={stilo.docenteFormContainer}>
            <div className={stilo.docenteFormMenu}><NavegadorMenu></NavegadorMenu></div>
            <h1 className={stilo.docenteFormTitle}>GestionGrupo Form</h1>
            <form className={stilo.docenteForm}
            onSubmit={handleSubmit}>
                
                <select
                  name="docenteId"
                  value={gestionGrupoData.docenteId}
                  onChange={handleInputchange}
                  required
                >
                  <option value="">Seleccionar docente</option>
                  {docentes.map((user) => (
                    <option key={user.docenteId} value={user.docenteId}>
                      {user.nombre}
                    </option>
                  ))}
                </select>
                <select
                  name="courseId"
                  value={gestionGrupoData.courseId}
                  onChange={handleInputchange}
                  required
                >
                  <option value="">Seleccionar course</option>
                  {courses.map((user) => (
                    <option key={user.courseId} value={user.courseId}>
                      {user.nombre}
                    </option>
                  ))}
                </select>
                <select
                  name="periodoAcademicoId"
                  value={gestionGrupoData.periodoAcademicoId}
                  onChange={handleInputchange}
                  required
                >
                  <option value="">Seleccionar course</option>
                  {periodoAcademicos.map((user) => (
                    <option key={user.periodoAcademicoId} value={user.periodoAcademicoId}>
                      {user.ciclo}
                    </option>
                  ))}
                </select>
                <button>save</button>
            </form>
        </div>
    )
}
export default GestionGrupoForm