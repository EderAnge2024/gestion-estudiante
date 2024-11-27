import { useState,useEffect } from "react"
import axios from 'axios'
import usePreriquisitoCursoStore from "../../store/PrerrequisitoCursoStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const PreriquisitoCursoFrom = ()=>{
    const {addPreriquisitoCurso} = usePreriquisitoCursoStore()
    const [courses,setCourses] = useState([])
    const [students,setStudents] = useState([])
    const [preriquisitoCursoData, setPreriquisitoCursoData] = useState({
        studentId:"",
        courseId:"",
        requisito:""       

    });
    console.log(preriquisitoCursoData);
    
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
                <select
                  name="studentId"
                  value={preriquisitoCursoData.studentId}
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
                <select
                  name="courseId"
                  value={preriquisitoCursoData.courseId}
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