import { useEffect, useState } from "react"
import usePreriquisitoCursoStore from "../../store/PrerrequisitoCursoStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const PreriquisitoCursoList = ()=>{
    const {fetchPreriquisitoCursos, preriquisitoCursos, deletePreriquisitoCurso, updatePreriquisitoCurso,fetchStudents,students,fetchCourses,courses} = usePreriquisitoCursoStore()
    const [editingPreriquisitoCurso, setEditingPreriquisitoCurso] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ studentId: '',courseId: '',requisito: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchPreriquisitoCursos()
        fetchCourses()
        fetchStudents()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (preriquisitoCursoId)=>{
        if(window.confirm("Are you sure?")){
            deletePreriquisitoCurso(preriquisitoCursoId)
            fetchPreriquisitoCursos() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (preriquisitoCurso) => {  
        setEditingPreriquisitoCurso(preriquisitoCurso) // Establece el estudiante en edición
        setFormData({ studentId: preriquisitoCurso.studentId, courseId: preriquisitoCurso.courseId, requisito: preriquisitoCurso.requisito}) // Rellena los campos con los datos actuales
    }

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        })
    }

    // Actualiza el estudiante en el servstudentIdor y refresca la lista
    const handleUpdate = async () => {
        await updatePreriquisitoCurso(editingPreriquisitoCurso.preriquisitoCursoId, formData) // Espera a que updatePreriquisitoCurso complete la actualización
        setEditingPreriquisitoCurso(null) // Cierra el formulario de edición
        fetchPreriquisitoCursos() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>PreriquisitoCurso List</h1>

                <div>
                <table border="1">
                      <thead>
                        <tr>
                          <th>ID Prerrequisito</th>
                          <th>Estudiante</th>
                          <th>Curso</th>
                          <th>Requisito</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {preriquisitoCursos.map((user) => (
                          <tr key={user.preriquisitoCursoId}>
                            <td>{user.preriquisitoCursoId}</td>           
                            <td>{students[user.studentId] || "Estudiante no encontrado"}
                                {user.nombre}</td>
                            <td>{courses[user.courseId] || "Curso no encontrado"}
                                {user.nombre}
                            </td>
                            <td>{user.requisito}</td>
                            <td>
                              <button onClick={() => handleDelete(user.preriquisitoCursoId)}>❌</button>
                              <button onClick={() => handleEditClick(user)}>✍️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingPreriquisitoCurso && (
                        <div>
                            <h3>Edit preriquisitoCurso</h3>
                            <input 
                                type="text" 
                                name="studentId" 
                                value={formData.studentId} 
                                onChange={handleInputChange} 
                                placeholder="studentId"
                            />
                            <input 
                                type="text" 
                                name="courseId" 
                                value={formData.courseId} 
                                onChange={handleInputChange} 
                                placeholder="courseId"
                            />
                            <input 
                                type="text" 
                                name="requisito" 
                                value={formData.requisito} 
                                onChange={handleInputChange} 
                                placeholder="requisito"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingPreriquisitoCurso(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default PreriquisitoCursoList
