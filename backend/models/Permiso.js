const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const Permiso = sequelize.define('Permiso',{
    permisoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    rolId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Rols', // Nombre de la tabla con la que se va arelcionar
            key: 'rolId' // Clave primaria de la tabla 'Students'
        }
    },
    accion:{
        type: DataTypes. STRING,
        allowNull: false
    },
    descripcion:{
        type: DataTypes. STRING,
        allowNull: false
    }

},{
    tableName: 'Permisos', // Nombre de la tabla en la base de datos en la que es o con la qvas a relacionar
    timestamps: false // Desactiva las columnas createdAt y updatedAt si no existen
})
Permiso.belongsTo(require('./Rol'), { foreignKey: 'rolId' });

module.exports= Permiso