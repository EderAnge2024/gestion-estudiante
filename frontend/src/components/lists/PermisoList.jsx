import { useEffect, useState } from "react";
import usePermisoStore from "../../store/PermisoStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const PermisoList = () => {
    const { fetchPermisos, permisos, deletePermiso, updatePermiso, fetchRoles, roles } = usePermisoStore();
    const [editingPermiso, setEditingPermiso] = useState(null); // Almacena el permiso que se está editando
    const [formData, setFormData] = useState({ rolId: '', accion: '', descripcion: '' }); // Datos del formulario de edición

    // Cargar la lista de permisos y roles al mostrar el componente
    useEffect(() => {
        fetchPermisos();
        fetchRoles(); // Carga los roles
    }, []);

    // Elimina el permiso tras confirmar y actualiza la lista
    const handleDelete = (permisoId) => {
        if (window.confirm("¿Estás seguro de eliminar este permiso?")) {
            deletePermiso(permisoId);
            fetchPermisos(); // Refresca la lista
        }
    };

    // Configura el permiso seleccionado para edición y rellena el formulario con sus datos
    const handleEditClick = (permiso) => {
        setEditingPermiso(permiso); // Establece el permiso en edición
        setFormData({ rolId: permiso.rolId, accion: permiso.accion, descripcion: permiso.descripcion }); // Rellena los campos
    };

    // Maneja los cambios en el formulario de edición
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value, // Actualiza solo el campo modificado
        });
    };

    // Actualiza el permiso en el servidor y refresca la lista
    const handleUpdate = async () => {
        await updatePermiso(editingPermiso.permisoId, formData); // Actualiza el permiso
        setEditingPermiso(null); // Cierra el formulario de edición
        fetchPermisos(); // Recarga la lista de permisos
    };

    return (
        <div>
            <div>
                <NavegadorMenu />
            </div>
            <div>
                <h1>Permiso List</h1>

                <div>
                    {
                        permisos.map((user) => (
                            <div key={user.permisoId}>
                                <h3>
                                    <span
                                        style={{ textDecoration: "underline", cursor: "pointer" }}
                                        title={roles[user.rolId] || "Cargando nombre..."} // Tooltip con el nombre del rol
                                    >
                                        {user.permisoId} {/* Identificador del permiso */}
                                    </span>
                                    <br />
                                    {roles[user.rolId] || user.rolId} {/* Muestra el nombre del rol si está disponible */}
                                    {user.accion} {user.descripcion}
                                </h3>
                                <button onClick={() => handleDelete(user.permisoId)}>❌</button>
                                <button onClick={() => handleEditClick(user)}>✍️</button>
                            </div>
                        ))
                    }
                </div>
            </div>

            {/* Muestra el formulario de edición solo si hay un permiso seleccionado */}
            {editingPermiso && (
                <div>
                    <h3>Edit Permiso</h3>
                    <input
                        type="text"
                        name="rolId"
                        value={formData.rolId}
                        onChange={handleInputChange}
                        placeholder="rolId"
                    />
                    <input
                        type="text"
                        name="accion"
                        value={formData.accion}
                        onChange={handleInputChange}
                        placeholder="Acción"
                    />
                    <input
                        type="text"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        placeholder="Descripción"
                    />
                    <button onClick={handleUpdate}>Guardar</button>
                    <button onClick={() => setEditingPermiso(null)}>Cancelar</button>
                </div>
            )}
        </div>
    );
};

export default PermisoList;
