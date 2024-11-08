const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const Usuario = sequelize.define('Usuario',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreUsuario: {
        type: DataTypes.STRING,
        allowNull: false// PARA QUE VAYA VACIO
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports= Usuario