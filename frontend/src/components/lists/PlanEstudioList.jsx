import { useEffect, useState } from "react"
import usePlanEstudioStore from "../../store/PlanEstudioStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const PlanEstudioList = ()=>{
    const {fetchPlanEstudios, planEstudios, deletePlanEstudio, updatePlanEstudio} = usePlanEstudioStore()
    const [editingPlanEstudio, setEditingPlanEstudio] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ student_id: '',meta: '',herramienta: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchPlanEstudios()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deletePlanEstudio(id)
            fetchPlanEstudios() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (planEstudio) => {  
        setEditingPlanEstudio(planEstudio) // Establece el estudiante en edición
        setFormData({ student_id: planEstudio.student_id, meta: planEstudio.meta, herramienta: planEstudio.herramienta}) // Rellena los campos con los datos actuales
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
        await updatePlanEstudio(editingPlanEstudio.id, formData) // Espera a que updatePlanEstudio complete la actualización
        setEditingPlanEstudio(null) // Cierra el formulario de edición
        fetchPlanEstudios() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>planEstudio List</h1>

                <div>
                    {
                        planEstudios.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.student_id} {user.meta} {user.herramienta}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingPlanEstudio && (
                        <div>
                            <h3>Edit planEstudio</h3>
                            <input 
                                type="text" 
                                name="student_id" 
                                value={formData.student_id} 
                                onChange={handleInputChange} 
                                placeholder="student_id"
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
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingPlanEstudio(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default PlanEstudioList
