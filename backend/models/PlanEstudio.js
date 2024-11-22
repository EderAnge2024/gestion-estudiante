const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const PlanEstudio = sequelize.define('PlanEstudio', {
    planEstudioId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Students', // Nombre de la tabla con la que se va arelcionar
            key: 'studentId' // Clave primaria de la tabla 'Students'
        }
    },
    meta: {
        type: DataTypes.STRING,
        allowNull: false // Evita que el campo esté vacío
    },
    herramienta: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'PlanEstudios', // Nombre de la tabla en la base de datos en la que es o con la qvas a relacionar
    timestamps: false // Desactiva las columnas createdAt y updatedAt si no existen
});
PlanEstudio.belongsTo(require('./Student'), { foreignKey: 'studentId' });

module.exports = PlanEstudio;
