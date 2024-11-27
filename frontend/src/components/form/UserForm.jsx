import { useState } from "react"
// import axios from 'axios'
import useUserStore from "../../store/UserStore";
import NavegadorMenu from "../navegador/NavegadorMenu";

const UserForm = ()=>{
    const {addUsuario} = useUserStore()

    const [userData, setUserData] = useState({
        nombreUsuario:"",
        contraseña:""
       

    });
    console.log(userData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setUserData({
            ...userData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addUsuario(userData)
        setUserData({
            nombreUsuario:"",
            contraseña:""
        })
        alert("User added successfully")
      
    }

    return(
        <div>
            <div><NavegadorMenu></NavegadorMenu></div>
            <h1>User Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter user"
                required
                name="nombreUsuario"
                value={userData.nombreUsuario}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter contra"
                required
                name="contraseña"
                value={userData.contraseña}
                onChange={handleInputchange}
                />
               
                <button>save</button>
            </form>
        </div>
    )
}
export default UserForm