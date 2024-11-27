import { useState,useEffect } from "react"
import axios from 'axios'
import usePlanEstudioStore from "../../store/PlanEstudioStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const PlanEstudioFrom = ()=>{
    const {addPlanEstudio} = usePlanEstudioStore()
    const [students,setStudents] = useState ([])
    const [planEstudioData, setPlanEstudioData] = useState({
        studentId:"",
        meta:"",
        herramienta:""
    });
    console.log(planEstudioData);

    useEffect(() => {
        const fetchUsuarios = async () => {
          try {
            const response = await axios.get("http://localhost:3001/student"); // Cambiar a la URL adecuada de tu API
            setStudents(response.data); // Almacenar los usuarios en el estado
          } catch (error) {
            console.error("Error al obtener los usuarios:", error);
          }
        };
    
        fetchUsuarios();
      }, []);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setPlanEstudioData({
            ...planEstudioData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addPlanEstudio(planEstudioData)
        setPlanEstudioData({
            studentId:"",
            meta:"",
            herramienta:""
        })
        alert("plan de estudio added successfully")
       
    }

    return(
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
            <h1>plan de estudio Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <select
                    name="studentId"
                    value={planEstudioData.studentId}
                    onChange={handleInputchange}
                    required
                  >
                    <option value="">Seleccionar estudiante</option>
                    {students.map((student) => (
                      <option key={student.studentId} value={student.studentId}>
                        {student.nombre} {/* Muestra el nombre del usuario */}
                      </option>
                    ))}
                </select>

                <input
                type="text"
                placeholder="Enter meta"
                required
                name="meta"
                value={planEstudioData.meta}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter herramienta"
                required
                name="herramienta"
                value={planEstudioData.herramienta}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default PlanEstudioFrom