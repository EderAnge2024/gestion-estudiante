const sequelize = require('../db')

// importamos modelos
const Student = require('./Student')
const Course = require('./Course')
const GestionAula = require('./GestionAula')
const Usuario = require('./Usuario')
const Matricula = require('./Matricula')
const db={
    sequelize,
    Student,
    Course,
    GestionAula,
    Usuario,
    Matricula,

    // agregar mas modelos aqui
}

module.exports = db
