import { useEffect, useState } from "react";
import useNotaStore from "../../store/NotaStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import modalStyle from "./studentStilo.module.css";

const NotaList = () => {
    const {fetchNotas, notas, deleteNota, updateNota, fetchStudents, students, fetchCourses, courses } = useNotaStore();
    const [editingNota, setEditingNota] = useState(null); // Nota en edición
    const [formData, setFormData] = useState({ courseId: '', studentId: '', fecha_ingre_nota: '', nota: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

    // Cargar los datos iniciales
    useEffect(() => {
        fetchNotas();
        fetchStudents();
        fetchCourses();
    }, []);
    const handleDelete = (matriculaId)=>{
        if(window.confirm("Are you sure?")){
            deleteNota(matriculaId)
            fetchNotas() // Refresca 
        }  
    }
    // Maneja el cambio en el término de búsqueda
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // Maneja el clic en editar
    const handleEditClick = (nota) => {
        setEditingNota(nota);
        setFormData({ courseId: nota.courseId, studentId: nota.studentId, fecha_ingre_nota: nota.fecha_ingre_nota, nota: nota.nota });
        setIsModalOpen(true);
    };
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value // Actualiza solo el campo modificado
        })
    }
    // Actualiza la nota
    const handleUpdate = async () => {
        await updateNota(editingNota.notaId, formData);
        setEditingNota(null);
        setIsModalOpen(false);
        fetchNotas();
    };

    // Filtra las notas según el término de búsqueda
    const filteredNotas = notas.filter((nota) => {
        const courseName = courses[nota.courseId]?.toLowerCase() || "curso no encontrado";
        const studentName = students[nota.studentId]?.toLowerCase() || "estudiante no encontrado";
        return (
            courseName.includes(searchTerm) ||
            studentName.includes(searchTerm) ||
            nota.fecha_ingre_nota.toLowerCase().includes(searchTerm) ||
            nota.nota.toString().includes(searchTerm)
        );
    });

    return (
        <div>
            <div>
                <NavegadorMenu />
            </div>
            <div>
                <h1>Nota List</h1>
                <input
                    type="text"
                    placeholder="Buscar por curso, estudiante, fecha o nota"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{
                        marginBottom: "20px",
                        padding: "10px",
                        width: "300px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />
                <div>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Curso</th>
                                <th>Estudiante</th>
                                <th>Fecha de Ingreso</th>
                                <th>Nota</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredNotas.map((user) => (
                                <tr key={user.notaId}>
                                    <td>{courses[user.courseId] || "Curso no encontrado"}</td>
                                    <td>{students[user.studentId] || "Estudiante no encontrado"}</td>
                                    <td>{user.fecha_ingre_nota}</td>
                                    <td>{user.nota}</td>
                                    <td>
                                        <button onClick={() => handleDelete(user.notaId)}>❌</button>
                                        <button onClick={() => handleEditClick(user)}>✍️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {isModalOpen && (
                <div className={modalStyle.overlay}>
                    <div className={modalStyle.modal}>
                        <h3>Edit Nota</h3>
                        <input
                            type="text"
                            name="courseId"
                            value={formData.courseId}
                            onChange={handleInputChange}
                            placeholder="courseId"
                        />
                        <input
                            type="text"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleInputChange}
                            placeholder="studentId"
                        />
                        <input
                            type="text"
                            name="fecha_ingre_nota"
                            value={formData.fecha_ingre_nota}
                            onChange={handleInputChange}
                            placeholder="fecha_ingre_nota"
                        />
                        <input
                            type="text"
                            name="nota"
                            value={formData.nota}
                            onChange={handleInputChange}
                            placeholder="nota"
                        />
                        <br />
                        <button onClick={handleUpdate}>Save</button>
                        <button onClick={() => setIsModalOpen(null)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotaList;
