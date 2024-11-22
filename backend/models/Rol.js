const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const Rol = sequelize.define('Rol',{
    rolId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios', // Nombre de la tabla con la que se va arelcionar
            key: 'usuarioId' // Clave primaria de la tabla 'Students'
        }
    },
    rol:{
        type: DataTypes. STRING,
        allowNull: false
    }

},{
    tableName: 'Rols', // Nombre de la tabla en la base de datos en la que es o con la qvas a relacionar
    timestamps: false // Desactiva las columnas createdAt y updatedAt si no existen
})
Rol.belongsTo(require('./Usuario'), { foreignKey: 'usuarioId' });

module.exports= Rol