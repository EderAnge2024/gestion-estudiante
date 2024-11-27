import { useState, useEffect } from "react";
import axios from "axios";
import useRolStore from "../../store/RolStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import stilo from "./stilo.module.css";

const RolFrom = () => {
  const { addRol } = useRolStore();
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar la lista de usuarios
  const [rolData, setRolData] = useState({
    usuarioId: "",
    rol: "",
  });
  console.log(rolData);
  
  const roles = ["Admin", "Profesor", "Estudiante"]; // Lista de roles predefinidos

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
    <div className={stilo.docenteFormContainer}>
      <div className={stilo.docenteFormMenu}>
        <NavegadorMenu />
      </div>
      <h1 className={stilo.docenteFormTitle}>Asignar Rol</h1>
      <form className={stilo.docenteForm} 
      onSubmit={handleSubmit}>
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

        {/* Selector de rol (ComboBox) */}
        <select
          name="rol"
          value={rolData.rol}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccionar rol</option>
          {roles.map((role, index) => (
            <option key={index} value={role}>
              {role} {/* Muestra cada rol de la lista */}
            </option>
          ))}
        </select>

        <button>Guardar</button>
      </form>
    </div>
  );
};

export default RolFrom;
