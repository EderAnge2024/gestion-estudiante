import { useEffect, useState } from "react"
import usePeriodoAcademicoStore from "../../store/PeriodoAcademicoStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const PeriodoAcademicoList = ()=>{
    const {fetchPeriodoAcademicos, periodoAcademicos, deletePeriodoAcademico, updatePeriodoAcademico} = usePeriodoAcademicoStore()
    const [editingPeriodoAcademico, setEditingPeriodoAcademico] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ docente_id: '',fechaInicio: '',fechaFinal: '',estado: '',ciclo: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchPeriodoAcademicos()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deletePeriodoAcademico(id)
            fetchPeriodoAcademicos() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (periodoAcademico) => {  
        setEditingPeriodoAcademico(periodoAcademico) // Establece el estudiante en edición
        setFormData({ docente_id: periodoAcademico.docente_id, fechaInicio: periodoAcademico.fechaInicio, fechaFinal: periodoAcademico.fechaFinal, estado: periodoAcademico.estado, ciclo: periodoAcademico.ciclo}) // Rellena los campos con los datos actuales
    }

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        })
    }

    // Actualiza el estudiante en el servdocente_idor y refresca la lista
    const handleUpdate = async () => {
        await updatePeriodoAcademico(editingPeriodoAcademico.id, formData) // Espera a que updatePeriodoAcademico complete la actualización
        setEditingPeriodoAcademico(null) // Cierra el formulario de edición
        fetchPeriodoAcademicos() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>periodoAcademico List</h1>

                <div>
                    {
                        periodoAcademicos.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.docente_id} {user.fechaInicio} {user.fechaFinal} {user.estado} {user.ciclo}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingPeriodoAcademico && (
                        <div>
                            <h3>Edit periodoAcademico</h3>
                            <input 
                                type="text" 
                                name="docente_id" 
                                value={formData.docente_id} 
                                onChange={handleInputChange} 
                                placeholder="docente_id"
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
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingPeriodoAcademico(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default PeriodoAcademicoList
