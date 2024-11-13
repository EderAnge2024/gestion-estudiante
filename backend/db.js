const {Sequelize}= require('sequelize')  // creamos una instancia de sequelize, y le pasamos los parametros
// por separado al constructor de Sequelize o pasando una única URI de conexión
const sequelize = new Sequelize('postgres://postgres:edichogenial@localhost:5432/example3',{
    logging:false 
}) 
module.exports= sequelize  