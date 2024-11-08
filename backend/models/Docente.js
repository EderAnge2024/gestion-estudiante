const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const Docente = sequelize.define('Docente',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false// PARA QUE VAYA VACIO
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports= Docente