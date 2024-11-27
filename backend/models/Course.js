const {DataTypes} = require('sequelize')
const sequelize = require('../db')
// 'Course' es igual a la tabla y el iid name son las columnas
const Course = sequelize.define('Course',{
    courseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    planEstudioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PlanEstudios', // Nombre de la tabla con la que se va arelcionar
            key: 'planEstudioId' // Clave primaria de la tabla 'Students'
        }
    },
    docenteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Docentes', // Nombre de la tabla con la que se va arelcionar
            key: 'docenteId' // Clave primaria de la tabla 'Students'
        }
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false// PARA QUE NO VAYA VACIO
    },
    credito: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ciclo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Courses', // Nombre de la tabla en la base de datos en la que es o con la qvas a relacionar
    timestamps: false // Desactiva las columnas createdAt y updatedAt si no existen
})
// Definir la relación con el modelo Usuario si es necesario
Course.belongsTo(require('./Docente'), { foreignKey: 'docenteId' });
Course.belongsTo(require('./PlanEstudio'), { foreignKey: 'planEstudioId'});

module.exports= Course    