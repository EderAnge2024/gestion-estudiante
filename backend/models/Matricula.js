const { DataTypes} = require('sequelize')
const sequelize = require('../db')

const Matricula = sequelize.define('Matricula',{
    matriculaId: {
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
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Students', // Nombre de la tabla con la que se va arelcionar
            key: 'studentId' // Clave primaria de la tabla 'Students'
        }
    },
    gestionGrupoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'GestionGrupos', // Nombre de la tabla con la que se va arelcionar
            key: 'gestionGrupoId' // Clave primaria de la tabla 'Students'
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

},{
    tableName: 'Matriculas', // Nombre de la tabla en la base de datos en la que es o con la qvas a relacionar
    timestamps: false // Desactiva las columnas createdAt y updatedAt si no existen
})
Matricula.belongsTo(require('./Student'), { foreignKey: 'studentId' });
Matricula.belongsTo(require('./GestionGrupo'), { foreignKey: 'gestionGrupoId' });
Matricula.belongsTo(require('./PeriodoAcademico'), { foreignKey: 'periodoAcademicoId' });


module.exports= Matricula