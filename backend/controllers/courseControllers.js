const Course= require('../models/Course')
const createCourseController = async({id,name,credits})=>{
    try {
        const newCourse = await Course.create({id,name,credits})
        return newCourse
    } catch (error) {
        throw new Error(error.message)
    }
}
// optiene aa todos los estudiantes
const getAllCourseController = async () =>{
    try {
        const Courses = await Course.findAll()
        return Courses
    } catch (error) {
        throw new Error(error.message)
    }
}
const updateCourseByIdController = async (id, courseData)=>{
    try {
        const course = await Course.findByPk(id)
        if(!course){
            return null
        }
        await course.update(courseData)
        return course
    } catch (error) {
        throw new Error(error.message)
    }
}
const deletedCourseByIdController = async(id)=>{
    try {
     const course= await Course.findByPk(id)
     if(!course){
         return null
     }
     await course.destroy()
     return course
    } catch (error) {
     throw new  Error(error.message)
    }
 }
 

module.exports={
    createCourseController,
    getAllCourseController,
    updateCourseByIdController,
    deletedCourseByIdController
}
