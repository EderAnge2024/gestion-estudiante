const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const GestionGrupo = sequelize.define('GestionGrupo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Courses', // Nombre de la tabla con la que se va arelcionar
            key: 'id' // Clave primaria de la tabla 'Students'
        }
    },
    docente_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Docentes', // Nombre de la tabla con la que se va arelcionar
            key: 'id' // Clave primaria de la tabla 'Students'
        }
    },
    periodoAcademico_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PeriodoAcademicos', // Nombre de la tabla con la que se va arelcionar
            key: 'id' // Clave primaria de la tabla 'Students'
        }
    }
}, {
    tableName: 'GestionGrupos', // Nombre de la tabla en la base de datos en la que es o con la qvas a relacionar
    timestamps: false // Desactiva las columnas createdAt y updatedAt si no existen
});

module.exports = GestionGrupo;
