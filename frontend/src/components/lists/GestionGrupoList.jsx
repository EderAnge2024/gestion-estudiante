import { useEffect, useState } from "react"
import useGestionGrupoStore from "../../store/GestionGrupoStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const GestionGrupoList = ()=>{
    const {fetchGestionGrupos, gestionGrupos, deleteGestionGrupo, updateGestionGrupo,fetchPeriodoAcademicos, periodoAcademicos, fetchDocentes, docentes,fetchCourses,courses} = useGestionGrupoStore()
    const [editingGestionGrupo, setEditingGestionGrupo] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ courseId: '',docenteId: '',periodoAcademicoId: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchGestionGrupos()
        fetchPeriodoAcademicos()
        fetchDocentes()
        fetchCourses()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (gestionGrupoId)=>{
        if(window.confirm("Are you sure?")){
            deleteGestionGrupo(gestionGrupoId)
            fetchGestionGrupos() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (gestiongrupo) => {  
        setEditingGestionGrupo(gestiongrupo) // Establece el estudiante en edición
        setFormData({ courseId: gestiongrupo.courseId, docenteId: gestiongrupo.docenteId, periodoAcademicoId: gestiongrupo.periodoAcademicoId}) // Rellena los campos con los datos actuales
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
        await updateGestionGrupo(editingGestionGrupo.gestionGrupoId, formData) // Espera a que updatePreriquisitoCurso complete la actualización
        setEditingGestionGrupo(null) // Cierra el formulario de edición
        fetchGestionGrupos() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>GestionGrupo List</h1>

                <div>
                <table border="1">
                      <thead>
                        <tr>
                          <th>Docente</th>
                          <th>Curso</th>
                          <th>Gestión Grupo Ciclo</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {gestionGrupos.map((user) => (
                          <tr key={user.gestionGrupoId}>
                            <td>
                                {docentes[user.docenteId] || "Docente no encontrado"}
                                {user.nombre}</td>
                            <td>
                                {courses[user.courseId] || "Curso no encontrado"}
                                {user.nombre}</td>
                            <td>
                                {periodoAcademicos[user.periodoAcademicoId] || "Periodo académico no encontrado"}
                                {user.ciclo}</td>
                            <td>
                              <button onClick={() => handleDelete(user.gestionGrupoId)}>❌</button>
                              <button onClick={() => handleEditClick(user)}>✍️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingGestionGrupo && (
                        <div>
                            <h3>Edit GestionGrupo</h3>
                            <input 
                                type="text" 
                                name="courseId" 
                                value={formData.courseId} 
                                onChange={handleInputChange} 
                                placeholder="courseId"
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
                                name="periodoAcademicoId" 
                                value={formData.periodoAcademicoId} 
                                onChange={handleInputChange} 
                                placeholder="periodoAcademicoId"
                            />
                            
                        
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingGestionGrupo(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default GestionGrupoList