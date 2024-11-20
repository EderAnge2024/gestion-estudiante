import { useEffect, useState } from "react"
import useActividadStore from "../../store/ActividadStore"
import Navegador from "../navegador/Navegador"

const ActividadList = ()=>{
    const {fetchActividad, Actividad, deleteActividad, updateActividad} = useActividadStore()
    const [editingActividad, setEditingActividad] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ usuario_id: '',rol: '',accion: '',fecha: '',descripcion: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchActividad()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deleteActividad(id)
            fetchActividad() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (actividad) => {  
        setEditingActividad(actividad) // Establece el estudiante en edición
        setFormData({ usuario_id: actividad.usuario_id, rol: actividad.rol, accion: actividad.accion, fecha: actividad.fecha, descripcion: actividad.descripcion}) // Rellena los campos con los datos actuales
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
        await updateActividad(editingActividad.id, formData) // Espera a que updatePreriquisitoCurso complete la actualización
        setEditingActividad(null) // Cierra el formulario de edición
        fetchActividad() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><Navegador></Navegador></div>
        <div>
            
            <div >
                <h1>Actividad List</h1>

                <div>
                    {
                        Actividad.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.usuario_id} {user.rol} {user.accion} {user.fecha} {user.descripcion}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingActividad && (
                        <div>
                            <h3>Edit Actividad</h3>
                            <input 
                                type="text" 
                                name="usuario_id" 
                                value={formData.usuario_id} 
                                onChange={handleInputChange} 
                                placeholder="usuario_id"
                            />
                            <input 
                                type="text" 
                                name="rol" 
                                value={formData.rol} 
                                onChange={handleInputChange} 
                                placeholder="rol"
                            />
                            <input 
                                type="text" 
                                name="accion" 
                                value={formData.accion} 
                                onChange={handleInputChange} 
                                placeholder="accion"
                            />
                            <input 
                                type="text" 
                                name="fecha" 
                                value={formData.fecha} 
                                onChange={handleInputChange} 
                                placeholder="fecha"
                            />
                            <input 
                                type="text" 
                                name="descripcion" 
                                value={formData.descripcion} 
                                onChange={handleInputChange} 
                                placeholder="descripcion"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingActividad(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default ActividadList
