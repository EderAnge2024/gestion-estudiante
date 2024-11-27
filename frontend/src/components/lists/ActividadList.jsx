<<<<<<< HEAD
import { useEffect, useState } from "react"
import useActividadStore from "../../store/ActividadStore"
import Navegador from "../navegador/Navegador"

const ActividadList = () => {
    const { fetchActividad, actividad, deleteActividad, updateActividad } = useActividadStore()
    const [editingActividad, setEditingActividad] = useState(null) // Almacena la actividad que se está editando
    const [formData, setFormData] = useState({
        usuario_id: '',
=======
import { useEffect, useState } from "react";
import useActividadStore from "../../store/ActividadStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const ActividadList = () => {
    const { fetchActividads, actividads, deleteActividad, updateActividad, fetchUsuarios, usuarios } = useActividadStore();
    const [editingActividad, setEditingActividad] = useState(null); // Actividad que se está editando
    const [formData, setFormData] = useState({
        usuarioId: '',
>>>>>>> main
        rol: '',
        accion: '',
        fecha: '',
        descripcion: ''
<<<<<<< HEAD
    }) // Datos del formulario de edición
    const [loading, setLoading] = useState(false) // Estado de carga

    // Cargar la lista de actividades al mostrar el componente
    useEffect(() => {
        setLoading(true)
        fetchActividad().finally(() => setLoading(false)) // Cargar las actividades y manejar el estado de carga
    }, [])

    // Elimina la actividad tras confirmar y actualiza la lista
    const handleDelete = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta actividad?")) {
            deleteActividad(id) // Llama a la función para eliminar
            // fetchActividad() // No es necesario si 'deleteActividad' ya actualiza el estado
        }
    }

    // Configura la actividad seleccionada para edición y rellena el formulario con sus datos
    const handleEditClick = (actividad) => {
        setEditingActividad(actividad) // Establece la actividad en edición
        setFormData({
            usuario_id: actividad.usuario_id || '',
            rol: actividad.rol || '',
            accion: actividad.accion || '',
            fecha: actividad.fecha || '',
            descripcion: actividad.descripcion || ''
        }) // Rellena los campos con los datos actuales
    }
=======
    }); // Datos del formulario de edición

    // Cargar la lista de actividades al mostrar el componente
    useEffect(() => {
        fetchActividads();
        fetchUsuarios();
    }, []);

    // Elimina una actividad tras confirmación y actualiza la lista
    const handleDelete = (actividadId) => {
        if (window.confirm("Are you sure?")) {
            deleteActividad(actividadId);
            fetchActividads(); // Refresca la lista de actividades
        }
    };

    // Configura la actividad seleccionada para edición y rellena el formulario con sus datos
    const handleEditClick = (actividad) => {
        setEditingActividad(actividad); // Establece la actividad en edición
        setFormData({
            usuarioId: actividad.usuarioId,
            rol: actividad.rol,
            accion: actividad.accion,
            fecha: actividad.fecha,
            descripcion: actividad.descripcion
        }); // Rellena los campos con los datos actuales de la actividad
    };
>>>>>>> main

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
<<<<<<< HEAD
        })
    }

    // Actualiza la actividad en el servidor y refresca la lista
    const handleUpdate = () => {
        updateActividad(editingActividad.id, formData) // Actualiza la actividad
        setEditingActividad(null) // Cierra el formulario de edición
        fetchActividad() // Luego recarga la lista de actividades
    }

    return (
        <div>
            <div><Navegador></Navegador></div>
            <div>
                <h1>Actividad List</h1>

                {/* Estado de carga */}
                {loading && <p>Loading...</p>}

                <div>
                    {actividad.map((actividad) => (
                        <div key={actividad.id}>
                            <h3>{actividad.id}<br /> {actividad.usuario_id} {actividad.rol} {actividad.accion} {actividad.fecha} {actividad.descripcion}</h3>
                            <button onClick={() => handleDelete(actividad.id)}>❌</button>
                            <button onClick={() => handleEditClick(actividad)}>✍️</button>
                        </div>
                    ))}
                </div>

                {/* Muestra el formulario de edición solo si hay una actividad seleccionada */}
                {editingActividad && (
                    <div>
                        <h3>Edit Actividad</h3>
                        <input 
                            type="text" 
                            name="usuario_id" 
                            value={formData.usuario_id} 
                            onChange={handleInputChange} 
                            placeholder="usuario_id"
                        />
                        <input 
                            type="text" 
                            name="rol" 
                            value={formData.rol} 
                            onChange={handleInputChange} 
                            placeholder="rol"
                        />
                        <input 
                            type="text" 
                            name="accion" 
                            value={formData.accion} 
                            onChange={handleInputChange} 
                            placeholder="accion"
                        />
                        <input 
                            type="text" 
                            name="fecha" 
                            value={formData.fecha} 
                            onChange={handleInputChange} 
                            placeholder="fecha"
                        />
                        <input 
                            type="text" 
                            name="descripcion" 
                            value={formData.descripcion} 
                            onChange={handleInputChange} 
                            placeholder="descripcion"
                        />
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setEditingActividad(null)}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ActividadList
=======
        });
    };

    // Actualiza la actividad en el servidor y refresca la lista
    const handleUpdate = async () => {
        await updateActividad(editingActividad.actividadId, formData); // Espera a que se complete la actualización
        setEditingActividad(null); // Cierra el formulario de edición
        fetchActividads(); // Recarga la lista de actividades
    };

    return (
        <div>
            <div>
                <NavegadorMenu />
            </div>
            <div>
                <h1>Actividad List</h1>

                <div>
                {
                    actividads.map((user) => (
                        <div key={user.actividadId}>
                            <h3>
                                
                                {usuarios[user.usuarioId] || "usuario no encontrado"}<br /> 
                                {user.nombreUsuario}{user.rol} {user.accion} {user.fecha} {user.descripcion}
                            </h3>
                            <button onClick={() => handleDelete(user.actividadId)}>❌</button>
                            <button onClick={() => handleEditClick(user)}>✍️</button>
                        </div>
                    ))
                }

                </div>
            </div>

            {/* Muestra el formulario de edición solo si hay una actividad seleccionada */}
            {editingActividad && (
                <div>
                    <h3>Edit Actividad</h3>
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
                    <input 
                        type="text" 
                        name="accion" 
                        value={formData.accion} 
                        onChange={handleInputChange} 
                        placeholder="accion"
                    />
                    <input 
                        type="text" 
                        name="fecha" 
                        value={formData.fecha} 
                        onChange={handleInputChange} 
                        placeholder="fecha"
                    />
                    <input 
                        type="text" 
                        name="descripcion" 
                        value={formData.descripcion} 
                        onChange={handleInputChange} 
                        placeholder="descripcion"
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setEditingActividad(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ActividadList;
>>>>>>> main
