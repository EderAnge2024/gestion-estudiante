const sequelize = require('../db')

// importamos modelos
const Student = require('./Student')
const Course = require('./Course')
const GestionAula = require('./GestionAula')
const Usuario = require('./Usuario')
const PlanEstudio = require('./PlanEstudio')
const PreriquisitoCurso = require('./PrerrequisitoCurso')
const PeriodoAcademico = require('./PeriodoAcademico')
const GestionGrupo = require('./GestionGrupo')
const Docente = require('./Docente')
const Actividad = require('./Actividad')
const Matricula = require('./Matricula')
const Nota = require('./Nota')
const Permiso = require('./Permiso')
const Rol = require('./Rol')

const db={
    sequelize,
    Student,
    Course,
    GestionAula,
    Usuario,
    PlanEstudio,
    PreriquisitoCurso,
    PeriodoAcademico,
    GestionGrupo,
    Docente,
    Actividad,
    Matricula,
    Nota,
    Permiso,
    Rol
    // agregar mas modelos aqui
}

module.exports = db
