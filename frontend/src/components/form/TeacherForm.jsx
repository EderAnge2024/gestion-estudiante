import { useState } from "react"
import axios from 'axios'
import useTeacherStore from "../../store/TeacherStore";

const TeacherForm = ()=>{
    const {addTeacher} = useTeacherStore()

    const [teacherData, setTeacherData] = useState({
        nombre:"",
        apellido:"",
        direccion:"",
        telefono:"",
        email:""
       

    });
    console.log(teacherData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setTeacherData({
            ...teacherData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addTeacher(teacherData)
        setTeacherData({
        nombre:"",
        apellido:"",
        direccion:"",
        telefono:"",
        email:""
        })
        alert("teacher added successfully")
       
    }

    return(
        <div>
            <h1>Student Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter name"
                required
                name="nombre"
                value={teacherData.nombre}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter lastName"
                required
                name="apellido"
                value={teacherData.apellido}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter direccion"
                required
                name="direccion"
                value={teacherData.direccion}
                onChange={handleInputchange}
                />
                 <input
                type="text"
                placeholder="Enter telefono"
                required
                name="telefono"
                value={teacherData.telefono}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter email"
                required
                name="email"
                value={teacherData.email}
                onChange={handleInputchange}
                />
               
                <button>save</button>
            </form>
        </div>
    )
}
export default TeacherForm