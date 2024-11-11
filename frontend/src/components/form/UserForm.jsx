import { useState } from "react"
import axios from 'axios'
import useUserStore from "../../store/UserStore";

const UserForm = ()=>{
    const {addUser} = useUserStore()

    const [userData, setUserData] = useState({
        name:"",
        credidts:""
       

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
            name:"",
            credidts:""
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
                placeholder="Enter name"
                required
                name="nombre"
                value={userData.name}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter credits"
                required
                name="credits"
                value={userData.credidts}
                onChange={handleInputchange}
                />
               
                <button>save</button>
            </form>
        </div>
    )
}
export default UserForm