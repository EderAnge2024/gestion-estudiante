import { useState } from "react"
import axios from 'axios'
import usePreriquisitoCursoStore from "../../store/PrerrequisitoCursoStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const PreriquisitoCursoFrom = ()=>{
    const {addPreriquisitoCurso} = usePreriquisitoCursoStore()

    const [preriquisitoCursoData, setPreriquisitoCursoData] = useState({
        studentId:"",
        courseId:"",
        requisito:""       

    });
    console.log(preriquisitoCursoData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setPreriquisitoCursoData({
            ...preriquisitoCursoData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addPreriquisitoCurso(preriquisitoCursoData)
        setPreriquisitoCursoData({
            studentId:"",
            courseId:"",
            requisito:""
        })
        alert("PreriquisitoCurso added successfully")
       
    }

    return(
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
            <h1>PreriquisitoCurso Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter studentId"
                required
                name="studentId"
                value={preriquisitoCursoData.studentId}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter courseId"
                required
                name="courseId"
                value={preriquisitoCursoData.courseId}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter requisito"
                required
                name="requisito"
                value={preriquisitoCursoData.requisito}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default PreriquisitoCursoFrom