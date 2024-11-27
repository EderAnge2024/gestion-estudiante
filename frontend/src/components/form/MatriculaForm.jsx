import { useState, useEffect } from "react"
import axios from 'axios'
import useMatriculaStore from "../../store/MatriculaStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const MatriculaForm = ()=>{
    const {addMatricula} = useMatriculaStore()
    const [periodoAcademicos,setPeriodoAcademicos] = useState([])
    const [students,setStudents] = useState([])
    const [gestionGrupos,setGestionGrupos] = useState([])
    const [matriculaData, setMatriculaData] = useState({
        fecha:"",
        carrera:"",
        studentId:"",
        gestionGrupoId:"",
        periodoAcademicoId:""
    
    
    });
    console.log(matriculaData);

    useEffect(() => {
        const fetchUsuarios = async () => {
          try {
            const [studentsResponse, gestionGruposResponse,periodoAcademicoResponse] = await Promise.all([
              axios.get("http://localhost:3001/student"),
              axios.get("http://localhost:3001/gestionGrupo"),
              axios.get("http://localhost:3001/periodoAcademico"),
            ]);
    
            console.log("Docentes:", studentsResponse.data);
            console.log("PlanEstudios:", gestionGruposResponse.data);
            console.log("PeriodoAcademico:", periodoAcademicoResponse.data);
    
            setStudents(studentsResponse.data);
            setGestionGrupos(gestionGruposResponse.data);
            setPeriodoAcademicos(periodoAcademicoResponse.data);
          } catch (error) {
            console.error("Error al obtener los usuarios:", error);
          }
        };
    
        fetchUsuarios();
      }, []);

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
        <div>
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
            <select
                  name="studentId"
                  value={matriculaData.studentId}
                  onChange={handleInputchange}
                  required
                >
                  <option value="">Seleccionar student</option>
                  {students.map((user) => (
                    <option key={user.studentId} value={user.studentId}>
                      {user.nombre}
                    </option>
                  ))}
                </select>
                <select
                  name="gestionGrupoId"
                  value={matriculaData.gestionGrupoId}
                  onChange={handleInputchange}
                  required
                >
                  <option value="">Seleccionar gestioGrupo</option>
                  {gestionGrupos.map((user) => (
                    <option key={user.gestionGrupoId} value={user.gestionGrupoId}>
                      {user.gestionGrupoId}
                    </option>
                  ))}
                </select>
                <select
                  name="periodoAcademicoId"
                  value={matriculaData.periodoAcademicoId}
                  onChange={handleInputchange}
                  required
                >
                  <option value="">Seleccionar periodo academico</option>
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
export default MatriculaForm

