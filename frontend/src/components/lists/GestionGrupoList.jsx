import { useEffect, useState } from "react"
import useGestionGrupoStore from "../../store/GestionGrupoStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const GestionGrupoList = ()=>{
    const {fetchGestionGrupos, gestionGrupos, deleteGestionGrupo, updateGestionGrupo} = useGestionGrupoStore()
    const [editingGestionGrupo, setEditingGestionGrupo] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ curso_id: '',docente_id: '',periodoAcademico_id: ''}) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchGestionGrupos()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deleteGestionGrupo(id)
            fetchGestionGrupos() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (gestiongrupo) => {  
        setEditingGestionGrupo(gestiongrupo) // Establece el estudiante en edición
        setFormData({ curso_id: gestiongrupo.curso_id, docente_id: gestiongrupo.docente_id, periodoAcademico_id: gestiongrupo.periodoAcademico_id}) // Rellena los campos con los datos actuales
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
        await updateGestionGrupo(editingGestionGrupo.id, formData) // Espera a que updatePreriquisitoCurso complete la actualización
        setEditingGestionGrupo(null) // Cierra el formulario de edición
        fetchGestionGrupos() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>GestionGrupo List</h1>

                <div>
                    {
                        gestionGrupos.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.curso_id} {user.docente_id} {user.periodoAcademico_id} </h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingGestionGrupo && (
                        <div>
                            <h3>Edit GestionGrupo</h3>
                            <input 
                                type="text" 
                                name="curso_id" 
                                value={formData.curso_id} 
                                onChange={handleInputChange} 
                                placeholder="curso_id"
                            />
                            <input 
                                type="text" 
                                name="docente_id" 
                                value={formData.docente_id} 
                                onChange={handleInputChange} 
                                placeholder="docente_id"
                            />
                            <input 
                                type="text" 
                                name="periodoAcademico_id" 
                                value={formData.periodoAcademico_id} 
                                onChange={handleInputChange} 
                                placeholder="periodoAcademico_id"
                            />
                            
                        
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingGestionGrupo(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default GestionGrupoList