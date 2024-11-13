const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const Matricula = sequelize.define('Matricula',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false// PARA QUE VAYA VACIO
    },
    carrera: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
})

module.exports= Matricula