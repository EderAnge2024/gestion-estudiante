import { useEffect, useState } from "react"
import usePlanEstudioStore from "../../store/PlanEstudioStore"
import NavegadorMenu from "../navegador/NavegadorMenu"
import modalStyle from "./studentStilo.module.css";

const PlanEstudioList = ()=>{
    const {fetchPlanEstudios, planEstudios, deletePlanEstudio, updatePlanEstudio,fetchStudents, students} = usePlanEstudioStore()
    const [editingPlanEstudio, setEditingPlanEstudio] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ studentId: '',meta: '',herramienta: ''}) // Datos del formulario de edición
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchPlanEstudios()
        fetchStudents()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (planEstudioId)=>{
        if(window.confirm("Are you sure?")){
            deletePlanEstudio(planEstudioId)
            fetchPlanEstudios() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (planEstudio) => {  
        setEditingPlanEstudio(planEstudio) // Establece el estudiante en edición
        setFormData({ studentId: planEstudio.studentId, meta: planEstudio.meta, herramienta: planEstudio.herramienta}) // Rellena los campos con los datos actuales
        setIsModalOpen(true);
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
        await updatePlanEstudio(editingPlanEstudio.planEstudioId, formData) // Espera a que updatePlanEstudio complete la actualización
        setEditingPlanEstudio(null) // Cierra el formulario de edición
        setIsModalOpen(false);
        fetchPlanEstudios() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>PlanEstudio List</h1>

                <div>
                <table border="1">
                      <thead>
                        <tr>
                          <th>ID Plan de Estudio</th>
                          <th>Estudiante</th>
                          <th>Meta</th>
                          <th>Herramienta</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {planEstudios.map((user) => (
                          <tr key={user.planEstudioId}>
                            <td>{user.planEstudioId}</td>
                            <td>{students[user.studentId] || "Estudiante no encontrado"}
                                {user.nombre}</td>
                            <td>{user.meta}</td>
                            <td>{user.herramienta}</td>
                            <td>
                              <button onClick={() => handleDelete(user.planEstudioId)}>❌</button>
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
                            <h3>Edit planEstudio</h3>
                            <input 
                                type="text" 
                                name="studentId" 
                                value={formData.studentId} 
                                onChange={handleInputChange} 
                                placeholder="studentId"
                            />
                            <input 
                                type="text" 
                                name="meta" 
                                value={formData.meta} 
                                onChange={handleInputChange} 
                                placeholder="meta"
                            />
                            <input 
                                type="text" 
                                name="herramienta" 
                                value={formData.herramienta} 
                                onChange={handleInputChange} 
                                placeholder="herramienta"
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

export default PlanEstudioList
