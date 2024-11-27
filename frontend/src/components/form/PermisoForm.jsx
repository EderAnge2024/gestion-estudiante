import { useState, useEffect } from "react";
import axios from 'axios'
import usePermisoStore from "../../store/PermisoStore";
import NavegadorMenu from "../navegador/NavegadorMenu";
import style from './PermisoForm.module.css'




const PermisoFrom = ()=>{
    const {addPermiso} = usePermisoStore()
    const [roles,setRoles] = useState([])
    const [permisoData, setPermisoData] = useState({
        rolId:"",
        accion:"",
        descripcion:""
    });
    

    // Obtener la lista de usuarios al cargar el componente
    useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3001/rol"); // Cambiar a la URL adecuada de tu API
        setRoles(response.data); // Almacenar los usuarios en el estado
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setPermisoData({
            ...permisoData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addPermiso(permisoData)
        setPermisoData({
            rolId:"",
            accion:"",
            descripcion:""
        })
        alert("permiso added successfully")
       
    }

    return(
        <div className={style.container}> 
            <div><NavegadorMenu></NavegadorMenu></div>
            <h1>Permios Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <select
                name="rolId"
                value={permisoData.rolId}
                onChange={handleInputchange}
                required
                >      
                <option value="">Seleccionar rol</option>
                {roles.map((rolss) => (
                  <option key={rolss.rolId} value={rolss.rolId}>
                    {rolss.rol} {/* Muestra el nombre del usuario */}
                  </option>
                ))}
                </select>
                <input
                type="text"
                placeholder="Enter accion"
                required
                name="accion"
                value={permisoData.accion}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter descripcion"
                required
                name="descripcion"
                value={permisoData.descripcion}
                onChange={handleInputchange}
                />
                <button>save</button>
            </form>
        </div>
    )
}
export default PermisoFrom