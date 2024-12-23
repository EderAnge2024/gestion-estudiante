import { useState } from "react"
import axios from 'axios'
import useGestionAulaStore from "../../store/GestioAulaStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import stilo from "./stilo.module.css";

const GestionAulaFrom = ()=>{
    const {addGestionAula} = useGestionAulaStore()

    const [gestioAulaData, setGestionAulaData] = useState({
        nombre:"",
        descripcion:"",
        estado:""
    });
    console.log(gestioAulaData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setGestionAulaData({
            ...gestioAulaData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addGestionAula(gestioAulaData)
        setGestionAulaData({
            nombre:"",
            descripcion:"",
            estado:""
        })
        alert("Aula added successfully")
       
    }

    return(
        <div className={stilo.docenteFormContainer}>
            <div className={stilo.docenteFormMenu}><NavegadorMenu></NavegadorMenu></div>
            <h1 className={stilo.docenteFormTitle}>Aula Form</h1>
            <form className={stilo.docenteForm}
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter nombre"
                required
                name="nombre"
                value={gestioAulaData.nombre}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter descripcion"
                required
                name="descripcion"
                value={gestioAulaData.descripcion}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter estado"
                required
                name="estado"
                value={gestioAulaData.estado}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default GestionAulaFrom