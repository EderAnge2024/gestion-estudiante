import { useState } from "react";
import useDocenteStore from "../../store/DocenteStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import style from './DocenteForm.module.css';

const DocenteForm = () => {
    const { addDocente } = useDocenteStore();

    const [docenteData, setDocenteData] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
        direccion: "",
        email: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDocenteData({
            ...docenteData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addDocente(docenteData);
        setDocenteData({
            nombre: "",
            apellido: "",
            telefono: "",
            direccion: "",
            email: ""
        });
        alert("Docente added successfully");
    };

    return (
        <div className={style.docenteFormContainer}>
            <div className={style.docenteFormMenu}>
                <NavegadorMenu />
            </div>
            <h1 className={style.docenteFormTitle}>Docente Form</h1>
            <form className={style.docenteForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter nombre"
                    required
                    name="nombre"
                    value={docenteData.nombre}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Enter apellido"
                    required
                    name="apellido"
                    value={docenteData.apellido}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Enter telefono"
                    required
                    name="telefono"
                    value={docenteData.telefono}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Enter direccion"
                    required
                    name="direccion"
                    value={docenteData.direccion}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="Enter email"
                    required
                    name="email"
                    value={docenteData.email}
                    onChange={handleInputChange}
                />
                <button className={style.docenteFormButton}>Save</button>
            </form>
        </div>
    );
};

export default DocenteForm;
