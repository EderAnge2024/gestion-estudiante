import { useEffect, useState } from "react"
import usePeriodoAcademicoStore from "../../store/PeriodoAcademicoStore"
import NavegadorMenu from "../navegador/NavegadorMenu"
import modalStyle from "./studentStilo.module.css";

const PeriodoAcademicoList = ()=>{
    const {fetchPeriodoAcademicos, periodoAcademicos, deletePeriodoAcademico, updatePeriodoAcademico,fetchDocentes,docentes} = usePeriodoAcademicoStore()
    const [editingPeriodoAcademico, setEditingPeriodoAcademico] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ docenteId: '',fechaInicio: '',fechaFinal: '',estado: '',ciclo: ''}) // Datos del formulario de edición
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchPeriodoAcademicos()
        fetchDocentes()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (periodoAcademicoId)=>{
        if(window.confirm("Are you sure?")){
            deletePeriodoAcademico(periodoAcademicoId)
            fetchPeriodoAcademicos() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (periodoAcademico) => {  
        setEditingPeriodoAcademico(periodoAcademico) // Establece el estudiante en edición
        setFormData({ docenteId: periodoAcademico.docenteId, fechaInicio: periodoAcademico.fechaInicio, fechaFinal: periodoAcademico.fechaFinal, estado: periodoAcademico.estado, ciclo: periodoAcademico.ciclo}) // Rellena los campos con los datos actuales
        setIsModalOpen(true); 
    }

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        })
    }

    // Actualiza el estudiante en el servdocenteIdor y refresca la lista
    const handleUpdate = async () => {
        await updatePeriodoAcademico(editingPeriodoAcademico.periodoAcademicoId, formData) // Espera a que updatePeriodoAcademico complete la actualización
        setEditingPeriodoAcademico(null) // Cierra el formulario de edición
        setIsModalOpen(false); 
        fetchPeriodoAcademicos() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>PeriodoAcademico List</h1>

                <div>
                <table border="1">
                      <thead>
                        <tr>
                          <th>Docente</th>
                          <th>Fecha Inicio</th>
                          <th>Fecha Final</th>
                          <th>Estado</th>
                          <th>Ciclo</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {periodoAcademicos.map((user) => (
                          <tr key={user.periodoAcademicoId}>
                            <td>{docentes[user.docenteId]}
                                {user.nombre}</td>
                            <td>{user.fechaInicio}</td>
                            <td>{user.fechaFinal}</td>
                            <td>{user.estado}</td>
                            <td>{user.ciclo}</td>
                            <td>
                              <button onClick={() => handleDelete(user.periodoAcademicoId)}>❌</button>
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
                            <h3>Edit periodoAcademico</h3>
                            <input 
                                type="text" 
                                name="docenteId" 
                                value={formData.docenteId} 
                                onChange={handleInputChange} 
                                placeholder="docenteId"
                            />
                            <input 
                                type="text" 
                                name="fechaInicio" 
                                value={formData.fechaInicio} 
                                onChange={handleInputChange} 
                                placeholder="fechaInicio"
                            />
                            <input 
                                type="text" 
                                name="fechaFinal" 
                                value={formData.fechaFinal} 
                                onChange={handleInputChange} 
                                placeholder="fechaFinal"
                            />
                            <input 
                                type="text" 
                                name="estado" 
                                value={formData.estado} 
                                onChange={handleInputChange} 
                                placeholder="estado"
                            />
                            <input 
                                type="text" 
                                name="ciclo" 
                                value={formData.ciclo} 
                                onChange={handleInputChange} 
                                placeholder="ciclo"
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

export default PeriodoAcademicoList
