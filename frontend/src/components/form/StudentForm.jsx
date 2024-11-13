import { useState } from "react"
import axios from 'axios'
import useStudentStore from "../../store/StudentStore";

const StudentForm = ()=>{
    const {addStudent} = useStudentStore()

    const [studentData, setStudentData] = useState({
        dni:"",
        nombre:"",
        apellido:"",
        telefono:"",
        email:"",
        apoderado:"",
        direccion:""
       

    });
    console.log(studentData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setStudentData({
            ...studentData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addStudent(studentData)
        setStudentData({
            dni:"",
            nombre:"",
            apellido:"",
            telefono:"",
            email:"",
            apoderado:"",
            direccion:""
        })
        alert("studend added successfully")
       
    }

    return(
        <div>
            <h1>Student Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter dni"
                required
                name="dni"
                value={studentData.dni}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter nombre"
                required
                name="nombre"
                value={studentData.nombre}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter apellido"
                required
                name="apellido"
                value={studentData.apellido}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter telefono"
                required
                name="telefono"
                value={studentData.telefono}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter email"
                required
                name="email"
                value={studentData.email}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter apoderado"
                required
                name="apoderado"
                value={studentData.apoderado}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter direccion"
                required
                name="direccion"
                value={studentData.direccion}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default StudentForm