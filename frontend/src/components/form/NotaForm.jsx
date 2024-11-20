import { useState } from "react"
import axios from 'axios'
import useNotaStore from "../../store/NotaStore";
import Navegador from "../navegador/Navegador";

const NotaForm = ()=>{
    const {addNota} = useNotaStore()

    const [notaData, setNotaData] = useState({
        curso_id:"",
        student_id:"",
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
            
            curso_id:"",
            student_id:"",
            fecha_ingre_nota:"",
            nota:"",
        })
        alert("nota added successfully")
       
    }

    return(
        <div>
        <div><Navegador></Navegador></div>
        <h1>Nota Form</h1>
        <form 
        onSubmit={handleSubmit}>
            <input
            type="text"
            placeholder="Enter curso_id"
            required
            name="curso_id"
            value={notaData.curso_id}
            onChange={handleInputchange}
            />
            <input
            type="text"
            placeholder="Enter student_id"
            required
            name="student_id"
            value={notaData.student_id}
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

