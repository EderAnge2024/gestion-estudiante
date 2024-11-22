import { useState, useEffect } from "react";
import useNotaStore from "../../store/NotaStore";
import NavegadorLogin from "../navegador/navegadorLogin";

const VerNotaList = () => {
  const { fetchNotasStudent, notas } = useNotaStore();
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [filteredNotas, setFilteredNotas] = useState(notas); // Estado para las notas filtradas

  // Cargar la lista de notas al mostrar el componente
  useEffect(() => {
    fetchNotasStudent(); 
  }, [fetchNotasStudent]);

  // Actualiza las notas filtradas cada vez que cambia el término de búsqueda
  useEffect(() => {
    const filtered = notas.filter((nota) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      // Asegurarse de que los valores existan antes de llamar a toLowerCase
      return (
        (nota.nombreEstudiante?.toLowerCase().includes(lowerCaseSearchTerm)) ||
        (nota.nombreCurso?.toLowerCase().includes(lowerCaseSearchTerm))
      );
    });
    setFilteredNotas(filtered);
  }, [searchTerm, notas]); // Filtrar cuando cambie el término de búsqueda o las notas

  return (
    <div>
      <div>
        <NavegadorLogin />
      </div>
      <div>
        <h1>Nota List</h1>

        {/* Campo de búsqueda */}
        <div>
          <input
            type="text"
            placeholder="Buscar por estudiante o curso"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
          />
        </div>

        {/* Mostrar las notas filtradas */}
        <div>
          {filteredNotas.length > 0 ? (
            filteredNotas.map((nota) => (
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
