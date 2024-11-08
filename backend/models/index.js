const sequelize = require('../db')

// importamos modelos
const Student = require('./Student')
const Course = require('./Course')
const GestionAula = require('./GestionAula')
const Usuario = require('./Usuario')

const db={
    sequelize,
    Student,
    Course,
    GestionAula,
    Usuario
    // agregar mas modelos aqui
}

module.exports = db
