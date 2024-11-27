const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const Nota = sequelize.define('Nota',{
    notaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Courses', // Nombre de la tabla con la que se va arelcionar
            key: 'courseId' // Clave primaria de la tabla 'Students'
        }
    },
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Students', // Nombre de la tabla con la que se va arelcionar
            key: 'studentId' // Clave primaria de la tabla 'Students'
        }
    },
    fecha_ingre_nota: {
        type: DataTypes.STRING,
        allowNull: false// PARA QUE VAYA VACIO
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false// PARA QUE VAYA VACIO
    },

},{
    tableName: 'Notas', // Nombre de la tabla en la base de datos en la que es o con la qvas a relacionar
    timestamps: false // Desactiva las columnas createdAt y updatedAt si no existen
})
Nota.belongsTo(require('./Course'), { foreignKey: 'courseId' });
Nota.belongsTo(require('./Student'), { foreignKey: 'studentId' });

module.exports= Nota