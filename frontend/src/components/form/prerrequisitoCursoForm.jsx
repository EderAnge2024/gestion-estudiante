import { useState } from "react"
// import axios from 'axios'
import usePreriquisitoCursoStore from "../../store/PrerrequisitoCursoStore";
import Navegador from "../navegador/Navegador";

const PreriquisitoCursoFrom = ()=>{
    const {addPreriquisitoCurso} = usePreriquisitoCursoStore()

    const [preriquisitoCursoData, setPreriquisitoCursoData] = useState({
        student_id:"",
        curso_id:"",
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
            student_id:"",
            curso_id:"",
            requisito:""
        })
        alert("PreriquisitoCurso added successfully")
       
    }

    return(
        <div>
            <div><Navegador></Navegador></div>
            <h1>PreriquisitoCurso Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter student_id"
                required
                name="student_id"
                value={preriquisitoCursoData.student_id}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter curso_id"
                required
                name="curso_id"
                value={preriquisitoCursoData.curso_id}
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