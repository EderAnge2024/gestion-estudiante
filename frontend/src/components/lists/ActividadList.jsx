import { useEffect, useState } from "react"
import useActividadStore from "../../store/ActividadStore"
import NavegadorMenu from "../navegador/NavegadorMenu"
import style from './ActividadList.module.css'

const ActividadList = ()=>{
    const {fetchActividads, actividads, deleteActividad, updateActividad} = useActividadStore()
    const [editingActividad, setEditingActividad] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ usuarioId: '',rol: '',accion: '',fecha: '',descripcion: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchActividads()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (actividadId)=>{
        if(window.confirm("Are you sure?")){
            deleteActividad(actividadId)
            fetchActividads() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (actividad) => {  
        setEditingActividad(actividad) // Establece el estudiante en edición
        setFormData({ usuarioId: actividad.usuarioId, rol: actividad.rol, accion: actividad.accion, fecha: actividad.fecha, descripcion: actividad.descripcion}) // Rellena los campos con los datos actuales
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
        await updateActividad(editingActividad.actividadId, formData) // Espera a que updatePreriquisitoCurso complete la actualización
        setEditingActividad(null) // Cierra el formulario de edición
        fetchActividads() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div className={style.conteiner}>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>Actividad List</h1>

                <div>
                    {
                        actividads.map((user) => (
                            <div key={user.actividadId}>
                                <h3>{user.actividadId}<br></br> {user.usuarioId} {user.rol} {user.accion} {user.fecha} {user.descripcion}</h3>
                                <button onClick={() => handleDelete(user.actividadId)}>❌</button>
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
                                value={formData.usuarioId} 
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