import { useEffect, useState } from "react"
import useNotaStore from "../../store/NotaStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const NotaList = ()=>{
    const {fetchNotas, notas, deleteNota, updateNota} = useNotaStore()
    const [editingNota, setEditingNota] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ curso_id: '',student_id: '',fecha_ingre_nota: '',nota: '' }) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchNotas()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deleteNota(id)
            fetchNotas() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (nota) => {  
        setEditingNota(nota) // Establece el estudiante en edición
        setFormData({ curso_id: nota.curso_id, student_id: nota.student_id, fecha_ingre_nota: nota.fecha_ingre_nota, nota: nota.nota}) // Rellena los campos con los datos actuales
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
        await updateNota(editingNota.id, formData) // Espera a que updateNota complete la actualización
        setEditingNota(null) // Cierra el formulario de edición
        fetchNotas() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div>
                <h1>Nota List</h1>

                <div>
                    {
                        notas.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.curso_id} {user.student_id} {user.fecha_ingre_nota} {user.nota}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingNota && (
                        <div>
                            <h3>Edit Nota</h3>
                            <input 
                                type="text" 
                                name="curso_id" 
                                value={formData.curso_id} 
                                onChange={handleInputChange} 
                                placeholder="curso_id"
                            />
                            <input 
                                type="text" 
                                name="student_id" 
                                value={formData.student_id} 
                                onChange={handleInputChange} 
                                placeholder="student_id"
                            />
                            <input 
                                type="text" 
                                name="fecha_ingre_nota" 
                                value={formData.fecha_ingre_nota} 
                                onChange={handleInputChange} 
                                placeholder="fecha_ingre_nota"
                            />
                            <input 
                                type="text" 
                                name="nota" 
                                value={formData.nota} 
                                onChange={handleInputChange} 
                                placeholder="nota"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingNota(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default NotaList
