import { useState, useEffect } from "react";
import axios from "axios";
import useCourseStore from "../../store/CourseStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const CourseForm = () => {
  const { addCourse } = useCourseStore();
  const [planEstudios, setPlanEstudios] = useState([]);
  const [docentes, setDocentes] = useState([]);
  const [CourseData, setCourseData] = useState({
    planEstudioId: "",
    docenteId: "",
    nombre: "",
    credito: "",
    ciclo: "",
  });

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const [docentesResponse, planEstudiosResponse] = await Promise.all([
          axios.get("http://localhost:3001/docente"),
          axios.get("http://localhost:3001/planEstudio"),
        ]);

        console.log("Docentes:", docentesResponse.data);
        console.log("PlanEstudios:", planEstudiosResponse.data);

        setDocentes(docentesResponse.data);
        setPlanEstudios(planEstudiosResponse.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setCourseData({
      ...CourseData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse(CourseData);
    setCourseData({
      planEstudioId: "",
      docenteId: "",
      nombre: "",
      credito: "",
      ciclo: "",
    });
    alert("Course added successfully");
  };

  return (
    <div>
      <NavegadorMenu />
      <h1>Course Form</h1>
      <form onSubmit={handleSubmit}>
        <select
          name="planEstudioId"
          value={CourseData.planEstudioId}
          onChange={handleInputchange}
          required
        >
          <option value="">Seleccionar plan estudio</option>
          {planEstudios.map((user) => (
            <option key={user.planEstudioId} value={user.planEstudioId}>
              {user.meta}
            </option>
          ))}
        </select>
        <select
          name="docenteId"
          value={CourseData.docenteId}
          onChange={handleInputchange}
          required
        >
          <option value="">Seleccionar docente</option>
          {docentes.map((user) => (
            <option key={user.docenteId} value={user.docenteId}>
              {user.nombre}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter nombre"
          required
          name="nombre"
          value={CourseData.nombre}
          onChange={handleInputchange}
        />
        <input
          type="text"
          placeholder="Enter credito"
          required
          name="credito"
          value={CourseData.credito}
          onChange={handleInputchange}
        />
        <input
          type="text"
          placeholder="Enter ciclo"
          required
          name="ciclo"
          value={CourseData.ciclo}
          onChange={handleInputchange}
        />
        <button>save</button>
      </form>
    </div>
  );
};

export default CourseForm;
