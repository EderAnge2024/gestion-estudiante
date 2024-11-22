import { useState } from "react"
// import axios from 'axios'
import usePlanEstudioStore from "../../store/PlanEstudioStore";
import Navegador from "../navegador/Navegador";

const PlanEstudioFrom = ()=>{
    const {addPlanEstudio} = usePlanEstudioStore()

    const [planEstudioData, setPlanEstudioData] = useState({
        student_id:"",
        meta:"",
        herramienta:""
    });
    console.log(planEstudioData);

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
            student_id:"",
            meta:"",
            herramienta:""
        })
        alert("plan de estudio added successfully")
       
    }

    return(
        <div>
            <div><Navegador></Navegador></div>
            <h1>plan de estudio Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter student_id"
                required
                name="student_id"
                value={planEstudioData.student_id}
                onChange={handleInputchange}
                />
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