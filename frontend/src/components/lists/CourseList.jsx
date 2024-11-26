import { useEffect, useState } from "react"
import useCourseStore from "../../store/CourseStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const CourseList = ()=>{
    const {fetchCourses, courses, deleteCourse, updateCourse,fetchDocentes,docentes,fetchPlanEstudios,planEstudios} = useCourseStore()
    const [editingCourse, setEditingCourse] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ planEstudioId: '',docenteId: '',nombre: '',credito: '',ciclo: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchCourses()
        fetchDocentes()
        fetchPlanEstudios()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (courseId)=>{
        if(window.confirm("Are you sure?")){
            deleteCourse(courseId)
            fetchCourses() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (Course) => {  
        setEditingCourse(Course) // Establece el estudiante en edición
        setFormData({ planEstudioId: Course.planEstudioId, docenteId: Course.docenteId, nombre: Course.nombre, credito: Course.credito, ciclo: Course.ciclo}) // Rellena los campos con los datos actuales
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
        await updateCourse(editingCourse.courseId, formData) // Espera a que updatePreriquisitoCurso complete la actualización
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
                            <div key={user.courseId}>
                                <h3>
                                    {docentes[user.docenteId] || "docente no encontrado"}
                                    {planEstudios[user.planEstudioId] || "plan de estudio  no encontrado"}
                                    
                                    {user.courseId}<br></br> {user.meta} {user.nombre} {user.nombre} {user.credito} {user.ciclo}</h3>
                                <button onClick={() => handleDelete(user.courseId)}>❌</button>
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
                                name="planEstudioId" 
                                value={formData.planEstudioId} 
                                onChange={handleInputChange} 
                                placeholder="planEstudioId"
                            />
                            <input 
                                type="text" 
                                name="docenteId" 
                                value={formData.docenteId} 
                                onChange={handleInputChange} 
                                placeholder="docenteId"
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