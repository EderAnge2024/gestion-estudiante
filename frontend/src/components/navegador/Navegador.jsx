import React from 'react';
import { Link } from 'react-router-dom';
import stilo from './navegadorMneuStilo.module.css'

const Navegador = () => {
    return (
        <div >            
            <nav className={stilo.nav}>
                <Link to='/'> Inicio</Link>
                <Link to='/studentForm' > FORMULARIO DE GUARDAR</Link>
                <Link to='/studentList' > EDITAR Y ELIMNAR </Link>
                <Link to='/userList' > Lista de Usuarios </Link>
                <Link to='/userFrom' > guardar usuario</Link>
                <Link to='/gestionAulaFrom' > guardar Aula</Link>
                <Link to='/gestionAulaList' > lista Aula</Link>
                <Link to='/planEstudioFrom' > guardar plan estudio</Link>
                <Link to='/planEstudioList' > lista plan de estuido</Link>
                <Link to='/preriquisitoCursoFrom' > guardar prerrequisito del curso</Link>
                <Link to='/preriquisitoCursoList' > lista de prerrequisito del curso</Link>
                <Link to='/rolFrom' > guardar rol</Link>
                <Link to='/rolList' > lista de rol</Link>
                <Link to='/docenteFrom' > guardado de docentes</Link>
                <Link to='/docenteList' > lista de docentes</Link>
                <Link to='/matriculaFrom' > guardado de matriculas</Link>
                <Link to='/matriculaList' > lista de matriculas</Link>
                <Link to='/notaFrom' > guardado de nota</Link>
                <Link to='/notaList' > lista de notas</Link>
                <Link to='/actividadFrom' > guardado de actividad</Link>
                <Link to='/actividadList' > lista de actividades</Link>
                <Link to='/courseFrom' > guardado de cursos</Link>
                <Link to='/courseList' > lista de cursos</Link>
                <Link to='/gestioGrupoFrom' > guardado de gestio de grupos</Link>
                <Link to='/gestioGrupoList' > lista de gestion de grupo</Link>
                <Link to='/periodoAcademicoFrom' > guardar periodo academico</Link>
                <Link to='/periodoAcademicoList' > lista de periodo acedmico</Link>
                <Link to='/permisoFrom' > guardar permiso</Link>
                <Link to='/permisoList' > lista de permiso</Link>
            </nav>
        </div>
    );
}

export default Navegador;