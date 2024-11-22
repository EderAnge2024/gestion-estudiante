const sequelize = require('../db')
const {QueryTypes} = require('sequelize')

const query1Controllers = async()=>{
    try {
        const query2 = `
        SELECT u.role, s."firstName" 
        FROM "Users" AS u 
        INNER JOIN "Students" AS s
        ON u.id = s."userId" `
        const results= await sequelize.query(query2,{
            type: QueryTypes.SELECT
        })
        return results
    } catch (error) {
        console.error("Error en la consulta", error)
        throw error
    }
}

module.exports = {query1Controllers};