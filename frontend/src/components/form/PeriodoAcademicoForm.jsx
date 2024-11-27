import { useState, useEffect } from "react"
import axios from 'axios'
import usePeriodoAcademicoStore from "../../store/PeriodoAcademicoStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import stilo from "./stilo.module.css";

const PeriodoAcademicoFrom = ()=>{
    const {addPeriodoAcademico} = usePeriodoAcademicoStore()
    const [docentes, setDocentes] = useState([]);
    const [periodoAcademicoData, setPeriodoAcademicoData] = useState({
        docenteId:"",
        fechaInicio:"",
        fechaFinal:"",
        estado:"",
        ciclo:""
    });
    console.log(periodoAcademicoData);
 
    useEffect(() => {
        const fetchUsuarios = async () => {
          try {
            const [docentesResponse] = await Promise.all([
              axios.get("http://localhost:3001/docente"),
            ]);
    
            console.log("Docentes:", docentesResponse.data);
    
            setDocentes(docentesResponse.data);
          } catch (error) {
            console.error("Error al obtener los usuarios:", error);
          }
        };
    
        fetchUsuarios();
      }, []);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setPeriodoAcademicoData({
            ...periodoAcademicoData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addPeriodoAcademico(periodoAcademicoData)
        setPeriodoAcademicoData({
            docenteId:"",
            fechaInicio:"",
            fechaFinal:"",
            estado:"",
            ciclo:""
        })
        alert("periodo academico added successfully")
       
    }

    return(
        <div className={stilo.docenteFormContainer}>
            <div className={stilo.docenteFormMenu}><NavegadorMenu></NavegadorMenu></div>
            <h1 className={stilo.docenteFormTitle}>Periodo Academico Form</h1>
            <form className={stilo.docenteForm} 
            onSubmit={handleSubmit}>
                <select
                  name="docenteId"
                  value={periodoAcademicoData.docenteId}
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
                <input
                type="text"
                placeholder="Enter fechaInicio"
                required
                name="fechaInicio"
                value={periodoAcademicoData.fechaInicio}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter fechaFinal"
                required
                name="fechaFinal"
                value={periodoAcademicoData.fechaFinal}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter estado"
                required
                name="estado"
                value={periodoAcademicoData.estado}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter ciclo"
                required
                name="ciclo"
                value={periodoAcademicoData.ciclo}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default PeriodoAcademicoFrom