import { useEffect, useState } from "react"
import usePermisoStore from "../../store/PermisoStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const PermisoList = ()=>{
    const {fetchPermisos, permisos, deletePermiso, updatePermiso} = usePermisoStore()
    const [editingPermiso, setEditingPermiso] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ rolId: '',accion: '',descripcion: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchPermisos()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (permisoId)=>{
        if(window.confirm("Are you sure?")){
            deletePermiso(permisoId)
            fetchPermisos() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (permiso) => {  
        setEditingPermiso(permiso) // Establece el estudiante en edición
        setFormData({ rolId: permiso.rolId, accion: permiso.accion, descripcion: permiso.descripcion}) // Rellena los campos con los datos actuales
    }

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        })
    }

    // Actualiza el estudiante en el servrolIdor y refresca la lista
    const handleUpdate = async () => {
        await updatePermiso(editingPermiso.permisoId, formData) // Espera a que updatePermiso complete la actualización
        setEditingPermiso(null) // Cierra el formulario de edición
        fetchPermisos() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>permiso List</h1>

                <div>
                    {
                        permisos.map((user) => (
                            <div key={user.permisoId}>
                                <h3>{user.permisoId}<br></br> {user.rolId} {user.accion} {user.descripcion}</h3>
                                <button onClick={() => handleDelete(user.permisoId)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingPermiso && (
                        <div>
                            <h3>Edit permiso</h3>
                            <input 
                                type="text" 
                                name="rolId" 
                                value={formData.rolId} 
                                onChange={handleInputChange} 
                                placeholder="rolId"
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
                                name="descripcion" 
                                value={formData.descripcion} 
                                onChange={handleInputChange} 
                                placeholder="descripcion"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingPermiso(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default PermisoList
