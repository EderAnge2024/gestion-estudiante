import { useEffect, useState } from "react"
import useMatriculaStore from "../../store/MatriculaStore"
import NavegadorMenu from "../navegador/NavegadorMenu"

const MatriculaList = ()=>{
    const {fetchMatriculas, matriculas, deleteMatricula, updateMatricula} = useMatriculaStore()
    const [editingMatricula, setEditingMatricula] = useState(null) // Almacena el estudiante que se está editando
    const [formData, setFormData] = useState({ fecha: '',carrera: '',estudentId: '',grupoId: '',periodoAcademicoId: '' }) // Datos del formulario de edición

    // Cargar la lista de estudiantes al mostrar el componente
    useEffect(()=>{
        fetchMatriculas()
    },[])

    // Elimina el estudiante tras confirmar y actualiza la lista
    const handleDelete = (matriculaId)=>{
        if(window.confirm("Are you sure?")){
            deleteMatricula(matriculaId)
            fetchMatriculas() // Refresca 
        }  
    }
     //////----Agregado----///
    // Configura el estudiante seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (matricula) => {  
        setEditingMatricula(matricula) // Establece el estudiante en edición
        setFormData({ fecha: matricula.fecha, carrera: matricula.carrera, estudentId: matricula.estudentId, grupoId: matricula.grupoId, periodoAcademicoId: matricula.periodoAcademicoId}) // Rellena los campos con los datos actuales
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
        await updateMatricula(editingMatricula.matriculaId, formData) // Espera a que updateMatricula complete la actualización
        setEditingMatricula(null) // Cierra el formulario de edición
        fetchMatriculas() // Luego recarga la lista de estudiantes
    }
    /////-------------////

    return (
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
        <div>
            
            <div >
                <h1>Matricula List</h1>

                <div>
                    {
                        matriculas.map((user) => (
                            <div key={user.matriculaId}>
                                <h3>{user.matriculaId}<br></br> {user.fecha} {user.carrera} {user.estudentId} {user.grupoId} {user.periodoAcademicoId}</h3>
                                <button onClick={() => handleDelete(user.matriculaId)}>❌</button>
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
                                name="estudentId" 
                                value={formData.estudentId} 
                                onChange={handleInputChange} 
                                placeholder="estudentId"
                            />
                            <input 
                                type="text" 
                                name="grupoId" 
                                value={formData.grupoId} 
                                onChange={handleInputChange} 
                                placeholder="grupoId"
                            />
                            <input 
                                type="text" 
                                name="periodoAcademicoId" 
                                value={formData.periodoAcademicoId} 
                                onChange={handleInputChange} 
                                placeholder="periodoAcademicoId"
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
