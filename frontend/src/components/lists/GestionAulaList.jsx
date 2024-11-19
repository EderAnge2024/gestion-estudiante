import { useEffect, useState } from "react"
import Navegador from "../navegador/Navegador"
import useGestionAulaStore from "../../store/GestioAulaStore"

const GestionAulaList = ()=>{
    const {fetchGestionAulas, gestionAulas, deleteGestionAula, updateGestionAula} = useGestionAulaStore()
    const [editingGestionAula, setEditingGestionAula] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ nombre: '',descripcion: '',estado: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchGestionAulas()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deleteGestionAula(id)
            fetchGestionAulas() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (gestionAula) => {  
        setEditingGestionAula(gestionAula) // Establece el estudiante en edición
        setFormData({ nombre: gestionAula.nombre, descripcion: gestionAula.descripcion, estado: gestionAula.estado}) // Rellena los campos con los datos actuales
    }

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        })
    }

    // Actualiza el estudiante en el servnombreor y refresca la lista
    const handleUpdate = async () => {
        await updateGestionAula(editingGestionAula.id, formData) // Espera a que updateGestionAula complete la actualización
        setEditingGestionAula(null) // Cierra el formulario de edición
        fetchGestionAulas() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><Navegador></Navegador></div>
        <div>
            
            <div >
                <h1>gestionAula List</h1>

                <div>
                    {
                        gestionAulas.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.nombre} {user.descripcion} {user.estado}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingGestionAula && (
                        <div>
                            <h3>Edit gestionAula</h3>
                            <input 
                                type="text" 
                                name="nombre" 
                                value={formData.nombre} 
                                onChange={handleInputChange} 
                                placeholder="nombre"
                            />
                            <input 
                                type="text" 
                                name="descripcion" 
                                value={formData.descripcion} 
                                onChange={handleInputChange} 
                                placeholder="descripcion"
                            />
                            <input 
                                type="text" 
                                name="estado" 
                                value={formData.estado} 
                                onChange={handleInputChange} 
                                placeholder="estado"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingGestionAula(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default GestionAulaList
