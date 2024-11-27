import { useState } from "react"
import axios from 'axios'
import useNotaStore from "../../store/NotaStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import style from './NotaForm.module.css'


const NotaForm = ()=>{
    const {addNota} = useNotaStore()

    const [notaData, setNotaData] = useState({
        courseId:"",
        studentId:"",
        fecha_ingre_nota:"",
        nota:"",
    
    
    });
    console.log(notaData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setNotaData({
            ...notaData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addNota(notaData)
        setNotaData({
            
            courseId:"",
            studentId:"",
            fecha_ingre_nota:"",
            nota:"",
        })
        alert("nota added successfully")
       
    }

    return(
        <div className={style.container}>
        <div><NavegadorMenu></NavegadorMenu></div>
        <h1>Nota Form</h1>
        <form 
        onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Enter courseId"
            required
            name="courseId"
            value={notaData.courseId}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter studentId"
            required
            name="studentId"
            value={notaData.studentId}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter fecha_ingre_nota"
            required
            name="fecha_ingre_nota"
            value={notaData.fecha_ingre_nota}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter nota"
            required
            name="nota"
            value={notaData.nota}
            onChange={handleInputchange}
            />
            <button>save</button>
        </form>
    </div>
)
}
export default NotaForm

