const {Sequelize}= require('sequelize')  // creamos una instancia de sequelize, y le pasamos los parametros
// por separado al constructor de Sequelize o pasando una única URI de conexión
const sequelize = new Sequelize('postgres://postgres:mimares10@localhost:5432/example2',{
    logging:false 
}) 
module.exports= sequelize  