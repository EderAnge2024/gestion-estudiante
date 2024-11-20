import { useEffect, useState } from "react"
import useRolStore from "../../store/RolStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const RolList = ()=>{
    const {fetchRols, rols, deleteRol, updateRol} = useRolStore()
    const [editingRol, setEditingRol] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ usuario_id: '',rol: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchRols()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deleteRol(id)
            fetchRols() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (rol) => {  
        setEditingRol(rol) // Establece el estudiante en edición
        setFormData({ usuario_id: rol.usuario_id, rol: rol.rol}) // Rellena los campos con los datos actuales
    }

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        })
    }

    // Actualiza el estudiante en el servusuario_idor y refresca la lista
    const handleUpdate = async () => {
        await updateRol(editingRol.id, formData) // Espera a que updateRol complete la actualización
        setEditingRol(null) // Cierra el formulario de edición
        fetchRols() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>rol List</h1>

                <div>
                    {
                        rols.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.usuario_id} {user.rol} {user.apellido} {user.telefono} {user.email} {user.apoderado} {user.direccion}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingRol && (
                        <div>
                            <h3>Edit rol</h3>
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
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingRol(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default RolList
