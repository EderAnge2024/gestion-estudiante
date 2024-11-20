import { useState } from "react"
import axios from 'axios'
import usePeriodoAcademicoStore from "../../store/PeriodoAcademicoStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const PeriodoAcademicoFrom = ()=>{
    const {addPeriodoAcademico} = usePeriodoAcademicoStore()

    const [periodoAcademicoData, setPeriodoAcademicoData] = useState({
        docente_id:"",
        fechaInicio:"",
        fechaFinal:"",
        estado:"",
        ciclo:""
    });
    console.log(periodoAcademicoData);

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
            docente_id:"",
            fechaInicio:"",
            fechaFinal:"",
            estado:"",
            ciclo:""
        })
        alert("periodo academico added successfully")
       
    }

    return(
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
            <h1>Periodo Academico Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter docente_id"
                required
                name="docente_id"
                value={periodoAcademicoData.docente_id}
                onChange={handleInputchange}
                />
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