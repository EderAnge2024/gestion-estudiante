import { useState } from "react"
import axios from 'axios'
import useUserStore from "../../store/UserStore";

const UserForm = ()=>{
    const {addUser} = useUserStore()

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
        addUser(userData)
        setUserData({
            nombreUsuario:"",
            contraseña:""
        })
        alert("User added successfully")
      
    }

    return(
        <div>
            <h1>Student Form</h1>
            <form 
            onSubmit={handleSubmit}>
                <input
                type="text"
                placeholder="Enter user"
                required
                name="usuario"
                value={userData.nombreUsuario}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter contra"
                required
                name="contraseñas"
                value={userData.contraseña}
                onChange={handleInputchange}
                />
               
                <button>save</button>
            </form>
        </div>
    )
}
export default UserForm