import { useEffect, useState } from "react";
import useActividadStore from "../../store/ActividadStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import modalStyle from "./studentStilo.module.css";

const ActividadList = () => {
    const { fetchActividads, actividads, deleteActividad, updateActividad, fetchUsuarios, usuarios } = useActividadStore();
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal
    const [editingActividad, setEditingActividad] = useState(null); // Actividad que se está editando
    const [formData, setFormData] = useState({
        usuarioId: '',
        rol: '',
        accion: '',
        fecha: '',
        descripcion: ''
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
        setIsModalOpen(true)
    };

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        });
    };

    // Actualiza la actividad en el servidor y refresca la lista
    const handleUpdate = async () => {
        await updateActividad(editingActividad.actividadId, formData); // Espera a que se complete la actualización
        setEditingActividad(null); // Cierra el formulario de edición
        setIsModalOpen(false); 
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
                <table border="1">
                      <thead>
                        <tr>
                          <th>Usuario</th>
                          <th>Rol</th>
                          <th>Acción</th>
                          <th>Fecha</th>
                          <th>Descripción</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {actividads.map((user) => (
                          <tr key={user.actividadId}>
                            
                            <td>{usuarios[user.usuarioId] || "Usuario no encontrado"}
                                {user.nombreUsuario}</td>
                            <td>{user.rol}</td>
                            <td>{user.accion}</td>
                            <td>{user.fecha}</td>
                            <td>{user.descripcion}</td>
                            <td>
                              <button onClick={() => handleDelete(user.actividadId)}>❌</button>
                              <button onClick={() => handleEditClick(user)}>✍️</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                </div>
            </div>

            {/* Muestra el formulario de edición solo si hay una actividad seleccionada */}
            {isModalOpen && (
                <div className={modalStyle.overlay}>
                    <div className={modalStyle.modal}>
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
                    /><br></br>
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsModalOpen(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActividadList;