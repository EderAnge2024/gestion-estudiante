import { useEffect, useState } from "react"
import useMatriculaStore from "../../store/MatriculaStore"
import NavegadorMenu from "../navegador/NavegadorMenu"
import modalStyle from "./studentStilo.module.css"

const MatriculaList = ()=>{
    const {fetchMatriculas, matriculas, deleteMatricula, updateMatricula,fetchStudents, students,fetchPeriodoAcademicos,periodoAcademicos,fetchGestionGrupos,gestionGrupos} = useMatriculaStore()
    const [editingMatricula, setEditingMatricula] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ fecha: '',carrera: '',studentId: '',gestionGrupoId: '',periodoAcademicoId: '' }) // Datos del formulario de edición
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchMatriculas()
        fetchStudents()
        fetchGestionGrupos()
        fetchPeriodoAcademicos()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (matriculaId)=>{
        if(window.confirm("Are you sure?")){
            deleteMatricula(matriculaId)
            fetchMatriculas() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (matricula) => {  
        setEditingMatricula(matricula) // Establece el estudiante en edición
        setFormData({ fecha: matricula.fecha, carrera: matricula.carrera, studentId: matricula.studentId, gestionGrupoId: matricula.gestionGrupoId, periodoAcademicoId: matricula.periodoAcademicoId}) // Rellena los campos con los datos actuales
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
        await updateMatricula(editingMatricula.matriculaId, formData) // Espera a que updateMatricula complete la actualización
        setEditingMatricula(null) // Cierra el formulario de edición
        setIsModalOpen(false);
        fetchMatriculas() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>Matricula List</h1>

                <div>
                <table border="1">
                      <thead>
                        <tr>
                          <th>Fecha</th> 
                          <th>Carrera</th>
                          <th>Estudiante</th>
                          <th>Grupo</th>
                          <th>Ciclo</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matriculas.map((user) => (
                          <tr key={user.matriculaId}>
                            <td>{user.fecha}</td>
                            <td>{user.carrera}</td>
                            <td>{students[user.studentId] || "Estudiante no encontrado"}
                                {user.nombre}</td>
                            <td>{user.gestionGrupoId}</td>
                            <td>{periodoAcademicos[user.periodoAcademicoId] || "Periodo académico no encontrado"}
                                {user.ciclo}</td>
                            <td>
                              <button onClick={() => handleDelete(user.matriculaId)}>❌</button>
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
                        <div className={modalStyle.overlay}>
                            <div className={modalStyle.modal}>
                            <h3>Edit Matricula</h3>
                            <input 
                                type="text" 
                                name="fecha" 
                                value={formData.fecha} 
                                onChange={handleInputChange} 
                                placeholder="fecha"
                            />
                            <input 
                                type="text" 
                                name="carrera" 
                                value={formData.carrera} 
                                onChange={handleInputChange} 
                                placeholder="carrera"
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
                                name="gestionGrupoId" 
                                value={formData.gestionGrupoId} 
                                onChange={handleInputChange} 
                                placeholder="gestionGrupoId"
                            />
                            <input 
                                type="text" 
                                name="periodoAcademicoId" 
                                value={formData.periodoAcademicoId} 
                                onChange={handleInputChange} 
                                placeholder="periodoAcademicoId"
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

export default MatriculaList
