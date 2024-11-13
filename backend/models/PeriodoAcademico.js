const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const PeriodoAcademico = sequelize.define('PeriodoAcademico',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    docente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Docentes', // Nombre de la tabla con la que se va arelcionar
            key: 'id' // Clave primaria de la tabla 'Students'
        }
    },
    fechaInicio: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaFinal: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ciclo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'PeriodoAcademicos', // Nombre de la tabla en la base de datos en la que es o con la qvas a relacionar
    timestamps: false // Desactiva las columnas createdAt y updatedAt si no existen
})

module.exports= PeriodoAcademico