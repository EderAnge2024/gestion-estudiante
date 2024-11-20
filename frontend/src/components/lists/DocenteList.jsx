import { useEffect, useState } from "react"
import useDocenteStore from "../../store/DocenteStore"
import NavegadorMenu from "../navegador/NavegadorMenu"
const DocenteList = ()=>{
    const {fetchDocentes, docentes, deleteDocente, updateDocente} = useDocenteStore()
    const [editingDocente, setEditingDocente] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ nombre: '',apellido: '',telefono: '',direccion: '',email: '' }) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchDocentes()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deleteDocente(id)
            fetchDocentes() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (docente) => {  
        setEditingDocente(docente) // Establece el estudiante en edición
        setFormData({ nombre: docente.nombre, apellido: docente.apellido, telefono: docente.telefono, direccion: docente.direccion, email: docente.email}) // Rellena los campos con los datos actuales
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
        await updateDocente(editingDocente.id, formData) // Espera a que updateDocente complete la actualización
        setEditingDocente(null) // Cierra el formulario de edición
        fetchDocentes() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>Docente List</h1>

                <div>
                    {
                        docentes.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.dni} {user.nombre} {user.apellido} {user.telefono} {user.direccion} {user.email}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingDocente && (
                        <div>
                            <h3>Edit Docente</h3>
                            <input 
                                type="text" 
                                name="nombre" 
                                value={formData.nombre} 
                                onChange={handleInputChange} 
                                placeholder="nombre"
                            />
                            <input 
                                type="text" 
                                name="apellido" 
                                value={formData.apellido} 
                                onChange={handleInputChange} 
                                placeholder="apellido"
                            />
                            <input 
                                type="text" 
                                name="telefono" 
                                value={formData.telefono} 
                                onChange={handleInputChange} 
                                placeholder="telefono"
                            />
                            <input 
                                type="text" 
                                name="direccion" 
                                value={formData.direccion} 
                                onChange={handleInputChange} 
                                placeholder="direccion"
                            />
                            <input 
                                type="text" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleInputChange} 
                                placeholder="email"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingDocente(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default DocenteList