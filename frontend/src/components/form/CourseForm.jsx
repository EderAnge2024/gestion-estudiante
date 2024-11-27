import { useState } from "react"
// import axios from 'axios'
import useCourseStore from "../../store/CourseStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import style from './CourseForm.module.css'

const CourseForm = ()=>{
    const {addCourse} = useCourseStore()

    const [CourseData, setCourseData] = useState({
        planEstudioId:"",
        docenteId:"",
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
            planEstudioId:"",
            docenteId:"",
            nombre:"",
            credito:"",
            ciclo:""
        })
        alert("Course added successfully")
       
    }

    return(
        <div className={style.container}>
            <div className={style.menu}><NavegadorMenu></NavegadorMenu></div>
            <h1>Course Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter planEstudioId"
                required
                name="planEstudioId"
                value={CourseData.planEstudioId}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter docenteId"
                required
                name="docenteId"
                value={CourseData.docenteId}
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