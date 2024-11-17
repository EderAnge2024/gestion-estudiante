import { useEffect, useState } from "react"
import useStudentStore from "../../store/StudentStore"
import Navegador from "../navegador/Navegador"

const StudentList = ()=>{
    const {fetchStudents, students, deleteStudent, updateStudent} = useStudentStore()
    const [editingStudent, setEditingStudent] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ dni: '',nombre: '',apellido: '',telefono: '',email: '',apoderado: '',direccion: '' }) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchStudents()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deleteStudent(id)
            fetchStudents() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (student) => {  
        setEditingStudent(student) // Establece el estudiante en edición
        setFormData({ dni: student.dni, nombre: student.nombre, apellido: student.apellido, telefono: student.telefono, email: student.email, apoderado: student.apoderado, direccion: student.direccion}) // Rellena los campos con los datos actuales
    }

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        })
    }

    // Actualiza el estudiante en el servdnior y refresca la lista
    const handleUpdate = async () => {
        await updateStudent(editingStudent.id, formData) // Espera a que updateStudent complete la actualización
        setEditingStudent(null) // Cierra el formulario de edición
        fetchStudents() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><Navegador></Navegador></div>
        <div>
            
            <div >
                <h1>Student List</h1>

                <div>
                    {
                        students.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.dni} {user.nombre} {user.apellido} {user.telefono} {user.email} {user.apoderado} {user.direccion}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingStudent && (
                        <div>
                            <h3>Edit Student</h3>
                            <input 
                                type="text" 
                                name="dni" 
                                value={formData.dni} 
                                onChange={handleInputChange} 
                                placeholder="dni"
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
                                name="apellido" 
                                value={formData.apellido} 
                                onChange={handleInputChange} 
                                placeholder="apellido"
                            />
                            <input 
                                type="text" 
                                name="telefono" 
                                value={formData.telefono} 
                                onChange={handleInputChange} 
                                placeholder="telefono"
                            />
                            <input 
                                type="text" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleInputChange} 
                                placeholder="email"
                            />
                            <input 
                                type="text" 
                                name="apoderado" 
                                value={formData.apoderado} 
                                onChange={handleInputChange} 
                                placeholder="apoderado"
                            />
                            <input 
                                type="text" 
                                name="direccion" 
                                value={formData.direccion} 
                                onChange={handleInputChange} 
                                placeholder="direccion"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingStudent(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default StudentList
