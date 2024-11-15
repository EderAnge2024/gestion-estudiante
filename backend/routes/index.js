const {Router} = require('express')
const {studentRouters} = require('../routes/studentRoutes')
const {courseRouters} = require('../routes/courseRoutes')
const {gestionAulaRouters} = require('../routes/gestionAulaRoutes')
const {usuarioRouters} = require('../routes/usuarioRoutes')
const {docenteRouters} = require('../routes/docenteRoutes')
const {planEstudioRouters} = require('../routes/planEstudioRoutes')
const {gestionGrupoRouters} = require('../routes/gestionGrupoRoutes')
const {periodoAcademicoRouters} = require('../routes/periodoAcademicoRoutes')
const {actividadRouters} = require('../routes/actividadRoutes')
const {matriculaRouters} = require('../routes/matriculaRoutes')
const {notaRouters} = require('../routes/notaRoutes')
const {permisoRouters} = require('../routes/permisoRoutes')
const {rolRouters} = require('../routes/rolRoutes')
const contraRoutes = require('../routes/contraRoutes')


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
router.use('/periodoAcademico',periodoAcademicoRouters)
router.use('/actividad',actividadRouters)
router.use('/matricula',matriculaRouters)
router.use('/nota',notaRouters)
router.use('/permiso',permisoRouters)
router.use('/rol',rolRouters)
router.use('/contra',contraRoutes)

module.exports = router