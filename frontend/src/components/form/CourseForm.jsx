import { useState } from "react"
// import axios from 'axios'
import useCourseStore from "../../store/CourseStore";
import Navegador from "../navegador/Navegador";

const CourseForm = ()=>{
    const {addCourse} = useCourseStore()

    const [CourseData, setCourseData] = useState({
        planEstudio_id:"",
        docente_id:"",
        nombre:"",
        credito:"",
        ciclo:""
    });
    console.log(CourseData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setCourseData({
            ...CourseData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addCourse(CourseData)
        setCourseData({
            planEstudio_id:"",
            docente_id:"",
            nombre:"",
            credito:"",
            ciclo:""
        })
        alert("Course added successfully")
       
    }

    return(
        <div>
            <div><Navegador></Navegador></div>
            <h1>Course Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter planEstudio_id"
                required
                name="planEstudio_id"
                value={CourseData.planEstudio_id}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter docente_id"
                required
                name="docente_id"
                value={CourseData.docente_id}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter nombre"
                required
                name="nombre"
                value={CourseData.nombre}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter credito"
                required
                name="credito"
                value={CourseData.credito}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter ciclo"
                required
                name="ciclo"
                value={CourseData.ciclo}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default CourseForm