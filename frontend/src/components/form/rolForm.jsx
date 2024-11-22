import { useState, useEffect } from "react";
import axios from "axios";
import useRolStore from "../../store/RolStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const RolFrom = () => {
  const { addRol } = useRolStore();
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar la lista de usuarios
  const [rolData, setRolData] = useState({
    usuarioId: "",
    rol: "",
  });

  // Obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3001/usuario"); // Cambiar a la URL adecuada de tu API
        setUsuarios(response.data); // Almacenar los usuarios en el estado
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRolData({
      ...rolData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addRol(rolData); // Asignar rol usando el store
    setRolData({
      usuarioId: "",
      rol: "",
    });
    alert("Rol asignado con éxito");
  };

  return (
    <div>
      <div>
        <NavegadorMenu />
      </div>
      <h1>Asignar Rol</h1>
      <form onSubmit={handleSubmit}>
        {/* Selector de usuario */}
        <select
          name="usuarioId"
          value={rolData.usuarioId}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccionar usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.usuarioId} value={usuario.usuarioId}>
              {usuario.nombreUsuario} {/* Muestra el nombre del usuario */}
            </option>
          ))}
        </select>

        {/* Campo para ingresar el rol */}
        <input
          type="text"
          placeholder="Ingresar rol"
          required
          name="rol"
          value={rolData.rol}
          onChange={handleInputChange}
        />
        <button>Guardar</button>
      </form>
    </div>
  );
};

export default RolFrom;
