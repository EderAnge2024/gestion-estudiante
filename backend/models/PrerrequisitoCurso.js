const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const PreriquisitoCurso = sequelize.define('PreriquisitoCurso',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Students', // Nombre de la tabla con la que se va arelcionar
            key: 'id' // Clave primaria de la tabla 'Students'
        }
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Courses', // Nombre de la tabla con la que se va arelcionar
            key: 'id' // Clave primaria de la tabla 'Students'
        }
    },
    requisito: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'PreriquisitoCursos', // Nombre de la tabla en la base de datos en la que es o con la qvas a relacionar
    timestamps: false // Desactiva las columnas createdAt y updatedAt si no existen
})
PreriquisitoCurso.belongsTo(require('./Student'), { foreignKey: 'student_id' });
PreriquisitoCurso.belongsTo(require('./Course'), { foreignKey: 'curso_id' });

module.exports= PreriquisitoCurso