import { useEffect, useState } from "react"
import usePreriquisitoCursoStore from "../../store/PrerrequisitoCursoStore"
import Navegador from "../navegador/Navegador"

const PreriquisitoCursoList = ()=>{
    const {fetchPreriquisitoCursos, preriquisitoCursos, deletePreriquisitoCurso, updatePreriquisitoCurso} = usePreriquisitoCursoStore()
    const [editingPreriquisitoCurso, setEditingPreriquisitoCurso] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ student_id: '',curso_id: '',requisito: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchPreriquisitoCursos()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deletePreriquisitoCurso(id)
            fetchPreriquisitoCursos() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (preriquisitoCurso) => {  
        setEditingPreriquisitoCurso(preriquisitoCurso) // Establece el estudiante en edición
        setFormData({ student_id: preriquisitoCurso.student_id, curso_id: preriquisitoCurso.curso_id, requisito: preriquisitoCurso.requisito}) // Rellena los campos con los datos actuales
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
        await updatePreriquisitoCurso(editingPreriquisitoCurso.id, formData) // Espera a que updatePreriquisitoCurso complete la actualización
        setEditingPreriquisitoCurso(null) // Cierra el formulario de edición
        fetchPreriquisitoCursos() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><Navegador></Navegador></div>
        <div>
            
            <div >
                <h1>preriquisitoCurso List</h1>

                <div>
                    {
                        preriquisitoCursos.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.student_id} {user.curso_id} {user.requisito}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingPreriquisitoCurso && (
                        <div>
                            <h3>Edit preriquisitoCurso</h3>
                            <input 
                                type="text" 
                                name="student_id" 
                                value={formData.student_id} 
                                onChange={handleInputChange} 
                                placeholder="student_id"
                            />
                            <input 
                                type="text" 
                                name="curso_id" 
                                value={formData.curso_id} 
                                onChange={handleInputChange} 
                                placeholder="curso_id"
                            />
                            <input 
                                type="text" 
                                name="requisito" 
                                value={formData.requisito} 
                                onChange={handleInputChange} 
                                placeholder="requisito"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingPreriquisitoCurso(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default PreriquisitoCursoList
