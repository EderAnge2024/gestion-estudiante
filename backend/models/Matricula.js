const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const Matricula = sequelize.define('Matricula',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    fecha: {
        type: DataTypes.STRING,
        allowNull: false// PARA QUE VAYA VACIO
    },
    carrera:{
        type: DataTypes.STRING,
        allowNull:false  
    },
    estudent_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Students', // Nombre de la tabla con la que se va arelcionar
            key: 'id' // Clave primaria de la tabla 'Students'
        }
    },
    grupo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'GestionGrupos', // Nombre de la tabla con la que se va arelcionar
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

},{
    tableName: 'Matriculas', // Nombre de la tabla en la base de datos en la que es o con la qvas a relacionar
    timestamps: false // Desactiva las columnas createdAt y updatedAt si no existen
})
Matricula.belongsTo(require('./Student'), { foreignKey: 'estudent_id' });
Matricula.belongsTo(require('./GestionGrupo'), { foreignKey: 'grupo_id' });
Matricula.belongsTo(require('./PeriodoAcademico'), { foreignKey: 'periodoAcademico_id' });


module.exports= Matricula