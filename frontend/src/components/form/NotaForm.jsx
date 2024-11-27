import { useState, useEffect } from "react"
import axios from 'axios'
import useNotaStore from "../../store/NotaStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const NotaForm = ()=>{
    const {addNota} = useNotaStore()
    const [students,setStudents] = useState([])
    const [courses,setCourses] = useState([])
    const [notaData, setNotaData] = useState({
        courseId:"",
        studentId:"",
        fecha_ingre_nota:"",
        nota:"",
    
    
    });
    console.log(notaData);

    useEffect(() => {
        const fetchUsuarios = async () => {
          try {
            const [studentsResponse, coursesResponse] = await Promise.all([
              axios.get("http://localhost:3001/student"),
              axios.get("http://localhost:3001/course"),
            ]);
    
            console.log("Docentes:", studentsResponse.data);
            console.log("Course:", coursesResponse.data);
    
            setStudents(studentsResponse.data);
            setCourses(coursesResponse.data);
          } catch (error) {
            console.error("Error al obtener los usuarios:", error);
          }
        };
    
        fetchUsuarios();
      }, []);
      
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
        <div>
        <div><NavegadorMenu></NavegadorMenu></div>
        <h1>Nota Form</h1>
        <form 
        onSubmit={handleSubmit}>
               
                <select
                  name="courseId"
                  value={notaData.courseId}
                  onChange={handleInputchange}
                  required
                >
                  <option value="">Seleccionar course</option>
                  {courses.map((user) => (
                    <option key={user.courseId} value={user.courseId}>
                      {user.nombre}
                    </option>
                  ))}
                </select>
                <select
                  name="studentId"
                  value={notaData.studentId}
                  onChange={handleInputchange}
                  required
                >
                  <option value="">Seleccionar student</option>
                  {students.map((user) => (
                    <option key={user.studentId} value={user.studentId}>
                      {user.nombre}
                    </option>
                  ))}
                </select>
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

