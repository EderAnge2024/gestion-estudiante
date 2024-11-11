import { useState } from "react"
import axios from 'axios'
import useCourseStore from "../../store/CourseStore";

const CourseForm = ()=>{
    const {addCourse} = useCourseStore()

    const [courseData, setCourseData] = useState({
        name:"",
        credidts:""
       

    });
    console.log(courseData);

    const handleInputchange = (e)=>{
        const {name,value} = e.target;
        setCourseData({
            ...courseData,
            [name]:value
        })

    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        addCourse(courseData)
        setCourseData({
            name:"",
            credidts:""
        })
        alert("course added successfully")
      
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
                name="dni"
                value={courseData.name}
                onChange={handleInputchange}
                />
                <input
                type="text"
                placeholder="Enter credits"
                required
                name="credits"
                value={courseData.credidts}
                onChange={handleInputchange}
                />
               
                <button>save</button>
            </form>
        </div>
    )
}
export default CourseForm