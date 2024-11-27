import { useEffect, useState } from "react"
import useUsuarioStore from "../../store/UserStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const UserList = ()=>{
    const {fetchUsuarios, usuarios, deleteUsuario, updateUsuario} = useUsuarioStore()
    const [editingUsuario, setEditingUsuario] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({nombreUsuario: '',contraseña: '' }) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchUsuarios()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (usuarioId)=>{
        if(window.confirm("Are you sure?")){
            deleteUsuario(usuarioId)
            fetchUsuarios() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (student) => {  
        setEditingUsuario(student) // Establece el estudiante en edición
        setFormData({ nombreUsuario: student.nombreUsuario, contraseña: student.contraseña}) // Rellena los campos con los datos actuales
    }

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        })
    }

    // Actualiza el estudiante en el servdnior y refresca la lista
    const handleUpdate = async () => {
        await updateUsuario(editingUsuario.usuarioId, formData) // Espera a que updateUsuario complete la actualización
        setEditingUsuario(null) // Cierra el formulario de edición
        fetchUsuarios() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>Users List</h1>

                <div>
                <table border="1">
                      <thead>
                        <tr>
                          <th>ID Usuario</th>
                          <th>Nombre de Usuario</th>
                          <th>Contraseña</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usuarios.map((user) => (
                          <tr key={user.usuarioId}>
                            <td>{user.usuarioId}</td>
                            <td>{user.nombreUsuario}</td>
                            <td>{user.contraseña}</td>
                            <td>
                              <button onClick={() => handleDelete(user.usuarioId)}>❌</button>
                              <button onClick={() => handleEditClick(user)}>✍️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingUsuario && (
                        <div>
                            <h3>Edit Student</h3>
                            <input 
                                type="text" 
                                name="nombreUsuario" 
                                value={formData.nombreUsuario} 
                                onChange={handleInputChange} 
                                placeholder="nombreUsuario"
                            />
                            <input 
                                type="text" 
                                name="contraseña" 
                                value={formData.contraseña} 
                                onChange={handleInputChange} 
                                placeholder="contraseña"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingUsuario(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default UserList
