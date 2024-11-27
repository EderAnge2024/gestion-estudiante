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
              <table border="1">
                <thead>
                  <tr>
                    <th>Nota ID</th>
                    <th>Estudiante</th>
                    <th>Curso</th>
                    <th>Fecha de Ingreso</th>
                    <th>Nota</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredNotas.map((nota) => (
                    <tr key={nota.notaId}>
                      <td>{nota.notaId}</td>
                      <td>{nota.nombreEstudiante}</td>
                      <td>{nota.nombreCurso}</td>
                      <td>{nota.fechaIngreso}</td>
                      <td>{nota.nota}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay notas disponibles.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default VerNotaList;
