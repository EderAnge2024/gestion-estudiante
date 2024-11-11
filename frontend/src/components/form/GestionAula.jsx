import { useState } from "react"
import axios from 'axios'
import useAulaStore from "../../store/AulaStore";

const GestionAula = ()=>{
    const {addAula} = useAulaStore()

    const [aulaData, setAulaData] = useState({
        nombre:"",
        descripcion:"",
        estado:""
       

    });
    console.log(aulaData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setAulaData({
            ...aulaData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addAula(aulaData)
        setAulaData({
        nombre:"",
        descripcion:"",
        estado:""
        })
        alert("Aula added successfully")
      
    }

    return(
        <div>
            <h1>Student Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter name"
                required
                name="nombre"
                value={aulaData.nombre}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter descripcion"
                required
                name="descripcion"
                value={aulaData.descripcion}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter estado"
                required
                name="estado"
                value={aulaData.estado}
                onChange={handleInputchange}
                />
               
                <button>save</button>
            </form>
        </div>
    )
}
export default GestionAula