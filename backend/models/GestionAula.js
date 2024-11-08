const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const GestionAula = sequelize.define('GestionAula',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false// PARA QUE VAYA VACIO
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports= GestionAula