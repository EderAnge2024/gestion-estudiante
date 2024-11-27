import { useState } from "react"
import axios from 'axios'
import usePlanEstudioStore from "../../store/PlanEstudioStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import style from './planEstudioForm.module.css'



const PlanEstudioFrom = ()=>{
    const {addPlanEstudio} = usePlanEstudioStore()

    const [planEstudioData, setPlanEstudioData] = useState({
        studentId:"",
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
                <input
                type="text"
                placeholder="Enter studentId"
                required
                name="studentId"
                value={planEstudioData.studentId}
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