import { useEffect, useState } from "react"
import useRolStore from "../../store/RolStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const RolList = ()=>{
    const {fetchRols, rols, deleteRol, updateRol,fetchUsuarios, usuarios} = useRolStore()
    const [editingRol, setEditingRol] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ usuarioId: '',rol: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchRols(),
        fetchUsuarios()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (rolId)=>{
        if(window.confirm("Are you sure?")){
            deleteRol(rolId)
            fetchRols() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (rol) => {  
        setEditingRol(rol) // Establece el estudiante en edición
        setFormData({ usuarioId: rol.usuarioId, rol: rol.rol}) // Rellena los campos con los datos actuales
    }

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        })
    }

    // Actualiza el estudiante en el servusuarioIdor y refresca la lista
    const handleUpdate = async () => {
        await updateRol(editingRol.rolId, formData) // Espera a que updateRol complete la actualización
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
                <table border="1">
                      <thead>
                        <tr>
                          <th>ID Rol</th>
                          <th>Nombre Usuario</th>
                          <th>Rol</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rols.map((user) => (
                          <tr key={user.rolId}>
                            <td>{user.rolId}</td>
                            <td>{usuarios[user.usuarioId] || "Usuario no encontrado"}
                                {user.nombreUsuario}</td>
                            <td>{user.rol}</td>
                            <td>
                              <button onClick={() => handleDelete(user.rolId)}>❌</button>
                              <button onClick={() => handleEditClick(user)}>✍️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingRol && (
                        <div>
                            <h3>Edit rol</h3>
                            <input 
                                type="text" 
                                name="usuarioId" 
                                value={formData.usuarioId} 
                                onChange={handleInputChange} 
                                placeholder="usuarioId"
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
