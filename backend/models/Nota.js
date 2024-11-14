const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const Nota = sequelize.define('Nota',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Courses', // Nombre de la tabla con la que se va arelcionar
            key: 'id' // Clave primaria de la tabla 'Students'
        }
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Students', // Nombre de la tabla con la que se va arelcionar
            key: 'dni' // Clave primaria de la tabla 'Students'
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
Nota.belongsTo(require('./Course'), { foreignKey: 'curso_id' });
Nota.belongsTo(require('./Student'), { foreignKey: 'student_id' });

module.exports= Nota