import { useEffect, useState } from "react";
import useStudentStore from "../../store/StudentStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import modalStyle from "./studentStilo.module.css";

const StudentList = () => {
    const { fetchStudents, students, deleteStudent, updateStudent } = useStudentStore();
    const [editingStudent, setEditingStudent] = useState(null); // Estudiante en edición
    const [formData, setFormData] = useState({ dni: '', nombre: '', apellido: '', telefono: '', email: '', apoderado: '', direccion: '' }); // Datos del formulario
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleDelete = (studentId) => {
        if (window.confirm("Are you sure?")) {
            deleteStudent(studentId);
            fetchStudents(); // Refresca 
        }
    };

    const handleEditClick = (student) => {
        setEditingStudent(student);
        setFormData({
            dni: student.dni,
            nombre: student.nombre,
            apellido: student.apellido,
            telefono: student.telefono,
            email: student.email,
            apoderado: student.apoderado,
            direccion: student.direccion
        });
        setIsModalOpen(true); // Abre el modal
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {
        await updateStudent(editingStudent.studentId, formData);
        setEditingStudent(null);
        setIsModalOpen(false); // Cierra el modal
        fetchStudents();
    };

    return (
        <div>
            <div><NavegadorMenu /></div>
            <div>
                <h1>Student List</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID Estudiante</th>
                            <th>DNI</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Apoderado</th>
                            <th>Dirección</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((user) => (
                            <tr key={user.studentId}>
                                <td>{user.studentId}</td>
                                <td>{user.dni}</td>
                                <td>{user.nombre}</td>
                                <td>{user.apellido}</td>
                                <td>{user.telefono}</td>
                                <td>{user.email}</td>
                                <td>{user.apoderado}</td>
                                <td>{user.direccion}</td>
                                <td>
                                    <button onClick={() => handleDelete(user.studentId)}>❌</button>
                                    <button onClick={() => handleEditClick(user)}>✍️</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Muestra el formulario de edición solo si el modal está abierto */}
                {isModalOpen && (
                    <div className={modalStyle.overlay}>
                        <div className={modalStyle.modal}>
                            <h3>Edit Student</h3>
                            <input 
                                type="text" 
                                name="dni" 
                                value={formData.dni} 
                                onChange={handleInputChange} 
                                placeholder="dni"
                            />
                            <input 
                                type="text" 
                                name="nombre" 
                                value={formData.nombre} 
                                onChange={handleInputChange} 
                                placeholder="nombre"
                            />
                            <input 
                                type="text" 
                                name="apellido" 
                                value={formData.apellido} 
                                onChange={handleInputChange} 
                                placeholder="apellido"
                            />
                            <input 
                                type="text" 
                                name="telefono" 
                                value={formData.telefono} 
                                onChange={handleInputChange} 
                                placeholder="telefono"
                            />
                            <input 
                                type="text" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleInputChange} 
                                placeholder="email"
                            />
                            <input 
                                type="text" 
                                name="apoderado" 
                                value={formData.apoderado} 
                                onChange={handleInputChange} 
                                placeholder="apoderado"
                            />
                            <input 
                                type="text" 
                                name="direccion" 
                                value={formData.direccion} 
                                onChange={handleInputChange} 
                                placeholder="direccion"
                            /><br></br>
                            <button onClick={handleUpdate}>Save</button>
                            <button onClick={() => setIsModalOpen(false)} >Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentList;

