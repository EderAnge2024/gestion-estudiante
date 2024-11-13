const {Router} = require('express')
const {studentRouters} = require('../routes/studentRoutes')
const {courseRouters} = require('../routes/courseRoutes')
const {gestionAulaRouters} = require('../routes/gestionAulaRoutes')
const {usuarioRouters} = require('../routes/usuarioRoutes')
const {docenteRouters} = require('../routes/docenteRoutes')
const {planEstudioRouters} = require('../routes/planEstudioRoutes')
const {gestionGrupoRouters} = require('../routes/gestionGrupoRoutes')

//const { Course } = require('../models')
// creamos el enrutador
const router = Router()
router.use('/student',studentRouters)
router.use('/course', courseRouters)
router.use('/gestionAula',gestionAulaRouters)
router.use('/usuario',usuarioRouters)
router.use('/docente',docenteRouters)
router.use('/planEstudio',planEstudioRouters)
router.use('/gestionGrupo',gestionGrupoRouters)

module.exports = router