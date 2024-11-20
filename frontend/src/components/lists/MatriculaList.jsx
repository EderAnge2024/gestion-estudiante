import { useEffect, useState } from "react"
import useMatriculaStore from "../../store/MatriculaStore"
import Navegador from "../navegador/Navegador"

const MatriculaList = ()=>{
    const {fetchMatriculas, matriculas, deleteMatricula, updateMatricula} = useMatriculaStore()
    const [editingMatricula, setEditingMatricula] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ fecha: '',carrera: '',estudent_id: '',grupo_id: '',periodoAcademico_id: '' }) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchMatriculas()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (id)=>{
        if(window.confirm("Are you sure?")){
            deleteMatricula(id)
            fetchMatriculas() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (matricula) => {  
        setEditingMatricula(matricula) // Establece el estudiante en edición
        setFormData({ fecha: matricula.fecha, carrera: matricula.carrera, estudent_id: matricula.estudent_id, grupo_id: matricula.grupo_id, periodoAcademico_id: matricula.periodoAcademico_id}) // Rellena los campos con los datos actuales
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
        await updateMatricula(editingMatricula.id, formData) // Espera a que updateMatricula complete la actualización
        setEditingMatricula(null) // Cierra el formulario de edición
        fetchMatriculas() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><Navegador></Navegador></div>
        <div>
            
            <div >
                <h1>Matricula List</h1>

                <div>
                    {
                        matriculas.map((user) => (
                            <div key={user.id}>
                                <h3>{user.id}<br></br> {user.fecha} {user.carrera} {user.estudent_id} {user.grupo_id} {user.periodoAcademico_id}</h3>
                                <button onClick={() => handleDelete(user.id)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Muestra el formulario de edición solo si hay un estudiante seleccionado */}
            {editingMatricula && (
                        <div>
                            <h3>Edit Matricula</h3>
                            <input 
                                type="text" 
                                name="fecha" 
                                value={formData.fecha} 
                                onChange={handleInputChange} 
                                placeholder="fecha"
                            />
                            <input 
                                type="text" 
                                name="carrera" 
                                value={formData.carrera} 
                                onChange={handleInputChange} 
                                placeholder="carrera"
                            />
                            <input 
                                type="text" 
                                name="estudent_id" 
                                value={formData.estudent_id} 
                                onChange={handleInputChange} 
                                placeholder="estudent_id"
                            />
                            <input 
                                type="text" 
                                name="grupo_id" 
                                value={formData.grupo_id} 
                                onChange={handleInputChange} 
                                placeholder="grupo_id"
                            />
                            <input 
                                type="text" 
                                name="periodoAcademico_id" 
                                value={formData.periodoAcademico_id} 
                                onChange={handleInputChange} 
                                placeholder="periodoAcademico_id"
                            />
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setEditingMatricula(null)}>Cancel</button>
                        </div>
                    )}
        </div>
        </div>
    )
}

export default MatriculaList
