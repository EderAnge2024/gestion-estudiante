import { useEffect } from "react";
import useNotaStore from "../../store/NotaStore";
import NavegadorLogin from "../navegador/navegadorLogin";

const VerNotaList = () => {
  const { fetchNotasStudent, notas } = useNotaStore();

  // Cargar la lista de notas al mostrar el componente
  useEffect(() => {
    fetchNotasStudent(); // Llamar la acción que obtiene las notas
  }, [fetchNotasStudent]); // Dependencia para que solo se ejecute una vez al montar

  return (
    <div>
      <div>
        <NavegadorLogin />
      </div>
      <div>
        <h1>Nota List</h1>
        <div>
          {notas.length > 0 ? (
            notas.map((nota) => (
              <div key={nota.notaId}>
                <h3>
                  {nota.notaId} <br /> 
                  Estudiante: {nota.nombreEstudiante} <br /> 
                  Curso: {nota.nombreCurso} <br />
                  Fecha de Ingreso: {nota.fechaIngreso} <br />
                  Nota: {nota.nota}
                </h3>
              </div>
            ))
          ) : (
            <p>No hay notas disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerNotaList;
