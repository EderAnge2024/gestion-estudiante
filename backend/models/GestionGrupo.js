const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const GestionGrupo = sequelize.define('GestionGrupo', {
    gestionGrupoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Courses', // Nombre de la tabla con la que se va arelcionar
            key: 'courseId' // Clave primaria de la tabla 'Students'
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
    periodoAcademicoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'PeriodoAcademicos', // Nombre de la tabla con la que se va arelcionar
            key: 'periodoAcademicoId' // Clave primaria de la tabla 'Students'
        }
    }
}, {
    tableName: 'GestionGrupos', // Nombre de la tabla en la base de datos en la que es o con la qvas a relacionar
    timestamps: false // Desactiva las columnas createdAt y updatedAt si no existen
});

GestionGrupo.belongsTo(require('./Course'), { foreignKey: 'courseId' });
GestionGrupo.belongsTo(require('./Docente'), { foreignKey: 'docenteId' });

module.exports = GestionGrupo;
