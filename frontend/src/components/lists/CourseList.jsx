import { useEffect, useState } from "react"
import useCourseStore from "../../store/CourseStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const CourseList = ()=>{
    const {fetchCourses, courses, deleteCourse, updateCourse} = useCourseStore()
    const [editingCourse, setEditingCourse] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ planEstudio_id: '',docente_id: '',nombre: '',credito: '',ciclo: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchCourses()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deleteCourse(id)
            fetchCourses() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (Course) => {  
        setEditingCourse(Course) // Establece el estudiante en edición
        setFormData({ planEstudio_id: Course.planEstudio_id, docente_id: Course.docente_id, nombre: Course.nombre, credito: Course.credito, ciclo: Course.ciclo}) // Rellena los campos con los datos actuales
    }

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        })
    }

    // Actualiza el estudiante en el servstudent_idor y refresca la lista
    const handleUpdate = async () => {
        await updateCourse(editingCourse.id, formData) // Espera a que updatePreriquisitoCurso complete la actualización
        setEditingCourse(null) // Cierra el formulario de edición
        fetchCourses() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>Course List</h1>

                <div>
                    {
                        courses.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.planEstudio_id} {user.docente_id} {user.nombre} {user.credito} {user.ciclo}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingCourse && (
                        <div>
                            <h3>Edit Course</h3>
                            <input 
                                type="text" 
                                name="planEstudio_id" 
                                value={formData.planEstudio_id} 
                                onChange={handleInputChange} 
                                placeholder="planEstudio_id"
                            />
                            <input 
                                type="text" 
                                name="docente_id" 
                                value={formData.docente_id} 
                                onChange={handleInputChange} 
                                placeholder="docente_id"
                            />
                            <input 
                                type="text" 
                                name="nombre" 
                                value={formData.nombre} 
                                onChange={handleInputChange} 
                                placeholder="nombre"
                            />
                            <input 
                                type="text" 
                                name="credito" 
                                value={formData.credito} 
                                onChange={handleInputChange} 
                                placeholder="credito"
                            />
                            <input 
                                type="text" 
                                name="ciclo" 
                                value={formData.ciclo} 
                                onChange={handleInputChange} 
                                placeholder="ciclo"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingCourse(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default CourseList