import { useEffect, useState } from "react"
import useNotaStore from "../../store/NotaStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const NotaList = ()=>{
    const {fetchNotas, notas, deleteNota, updateNota} = useNotaStore()
    const [editingNota, setEditingNota] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ courseId: '',studentId: '',fecha_ingre_nota: '',nota: '' }) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchNotas()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (notaId)=>{
        if(window.confirm("Are you sure?")){
            deleteNota(notaId)
            fetchNotas() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (nota) => {  
        setEditingNota(nota) // Establece el estudiante en edición
        setFormData({ courseId: nota.courseId, studentId: nota.studentId, fecha_ingre_nota: nota.fecha_ingre_nota, nota: nota.nota}) // Rellena los campos con los datos actuales
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
        await updateNota(editingNota.notaId, formData) // Espera a que updateNota complete la actualización
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
                            <div key={user.notaId}>
                                <h3>{user.notaId}<br></br> {user.courseId} {user.studentId} {user.fecha_ingre_nota} {user.nota}</h3>
                                <button onClick={() => handleDelete(user.notaId)}>❌</button>
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
                                name="courseId" 
                                value={formData.courseId} 
                                onChange={handleInputChange} 
                                placeholder="courseId"
                            />
                            <input 
                                type="text" 
                                name="studentId" 
                                value={formData.studentId} 
                                onChange={handleInputChange} 
                                placeholder="studentId"
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
