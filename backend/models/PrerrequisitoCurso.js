const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const PreriquisitoCurso = sequelize.define('PreriquisitoCurso',{
    preriquisitoCursoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Students', // Nombre de la tabla con la que se va arelcionar
            key: 'studentId' // Clave primaria de la tabla 'Students'
        }
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Courses', // Nombre de la tabla con la que se va arelcionar
            key: 'courseId' // Clave primaria de la tabla 'Students'
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
PreriquisitoCurso.belongsTo(require('./Student'), { foreignKey: 'studentId' });
PreriquisitoCurso.belongsTo(require('./Course'), { foreignKey: 'courseId' });

module.exports= PreriquisitoCurso