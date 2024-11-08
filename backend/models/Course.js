const {DataTypes} = require('sequelize')
const sequelize = require('../db')
// 'Course' es igual a la tabla y el iid name son las columnas
const Course = sequelize.define('Course',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false// PARA QUE NO VAYA VACIO
    },
    credits: {
        type: DataTypes.STRING,
    allowNull: false
    }
})

module.exports= Course    