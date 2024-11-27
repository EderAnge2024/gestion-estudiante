import { useEffect, useState } from "react"
import useNotaStore from "../../store/NotaStore"
import NavegadorMenu from "../navegador/NavegadorMenu"
import modalStyle from "./studentStilo.module.css";

const NotaList = ()=>{
    const {fetchNotas, notas, deleteNota, updateNota,fetchStudents,students,fetchCourses,courses} = useNotaStore()
    const [editingNota, setEditingNota] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ courseId: '',studentId: '',fecha_ingre_nota: '',nota: '' }) // Datos del formulario de edición
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchNotas()
        fetchStudents()
        fetchCourses()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (notaId)=>{
        if(window.confirm("Are you sure?")){
            deleteNota(notaId)
            fetchNotas() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (nota) => {  
        setEditingNota(nota) // Establece el estudiante en edición
        setFormData({ courseId: nota.courseId, studentId: nota.studentId, fecha_ingre_nota: nota.fecha_ingre_nota, nota: nota.nota}) // Rellena los campos con los datos actuales
        setIsModalOpen(true);
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
        await updateNota(editingNota.notaId, formData) // Espera a que updateNota complete la actualización
        setEditingNota(null) // Cierra el formulario de edición
        setIsModalOpen(false);
        fetchNotas() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div>
                <h1>Nota List</h1>

                <div>
                <table border="1">
                      <thead>
                        <tr>
                          <th>Curso</th>
                          <th>Estudiante</th>
                          <th>Fecha de Ingreso</th>
                          <th>Nota</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notas.map((user) => (
                          <tr key={user.notaId}>
                            <td>{courses[user.courseId] || "Curso no encontrado"}
                                {user.nombre}</td>
                            <td>{students[user.studentId] || "Estudiante no encontrado"}
                                {user.nombre}</td>
                            <td>{user.fecha_ingre_nota}</td>
                            <td>{user.nota}</td>
                            <td>
                              <button onClick={() => handleDelete(user.notaId)}>❌</button>
                              <button onClick={() => handleEditClick(user)}>✍️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {isModalOpen && (
                        <div className={modalStyle.overlay} >
                            <div className={modalStyle.modal}>
                            <h3>Edit Nota</h3>
                            <input 
                                type="text" 
                                name="courseId" 
                                value={formData.courseId} 
                                onChange={handleInputChange} 
                                placeholder="courseId"
                            />
                            <input 
                                type="text" 
                                name="studentId" 
                                value={formData.studentId} 
                                onChange={handleInputChange} 
                                placeholder="studentId"
                            />
                            <input 
                                type="text" 
                                name="fecha_ingre_nota" 
                                value={formData.fecha_ingre_nota} 
                                onChange={handleInputChange} 
                                placeholder="fecha_ingre_nota"
                            />
                            <input 
                                type="text" 
                                name="nota" 
                                value={formData.nota} 
                                onChange={handleInputChange} 
                                placeholder="nota"
                            /><br></br>
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setIsModalOpen(null)}>Cancel</button>
                            </div>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default NotaList
