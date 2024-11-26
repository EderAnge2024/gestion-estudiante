import { useState, useEffect } from "react";
// import axios from 'axios'
import useActividadStore from "../../store/ActividadStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import axios from "axios";
import style from './ActividadForm.module.css'

const ActividadForm = () => {
  const { addActividad } = useActividadStore();
  const [usuarios, setUsuarios] = useState([]); // Estado para almacenar la lista de usuarios
  const [actividadData, setActividadData] = useState({
    usuarioId: "",
    rol: "",
    accion: "",
    fecha: "",
    descripcion: "",
  });

  // Obtener la lista de usuarios al cargar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3001/usuario"); // Cambia a la URL correcta de tu API
        setUsuarios(response.data); // Almacenar los usuarios en el estado
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActividadData({
      ...actividadData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addActividad(actividadData); // Asignar la actividad usando el store
    setActividadData({
      usuarioId: "",
      rol: "",
      accion: "",
      fecha: "",
      descripcion: "",
    });
    alert("Actividad añadida con éxito");
  };

  return (
    <div>
      <div className={style.container}>
        <NavegadorMenu />
      </div>
      <h1 className={style.text}>Formulario de Actividad</h1>
      <form onSubmit={handleSubmit}>
        {/* Selector de usuario */}
        <select
          name="usuarioId"
          value={actividadData.usuarioId}
          onChange={handleInputChange}
          required
        >
          <option value="">Seleccionar usuario</option>
          {usuarios.map((usuario) => (
            <option key={usuario.usuarioId} value={usuario.usuarioId}>
              {usuario.nombreUsuario} {/* Mostrar el nombre del usuario */}
            </option>
          ))}
        </select>

        {/* Campo para ingresar el rol */}
        <input
          type="text"
          placeholder="Ingresar rol"
          required
          name="rol"
          value={actividadData.rol}
          onChange={handleInputChange}
        />

        {/* Campo para ingresar la acción */}
        <input
          type="text"
          placeholder="Ingresar acción"
          required
          name="accion"
          value={actividadData.accion}
          onChange={handleInputChange}
        />

        {/* Campo para ingresar la fecha */}
        <input
          type="text"
          placeholder="Ingresar fecha"
          required
          name="fecha"
          value={actividadData.fecha}
          onChange={handleInputChange}
        />

        {/* Campo para ingresar la descripción */}
        <input
          type="text"
          placeholder="Ingresar descripción"
          required
          name="descripcion"
          value={actividadData.descripcion}
          onChange={handleInputChange}
        />

        <button>Guardar</button>
      </form>
    </div>
  );
};

export default ActividadForm;
