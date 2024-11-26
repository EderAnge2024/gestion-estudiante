import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navegador.module.css'

const Navegador = () => {
    return (
        <div >            
            <nav className={style.nav}>
                <Link to='/navegadorMenu'> Inicio</Link>
                <Link to='/gestionAulaFrom' >GUARDAR GESTION DE AULAS</Link>
                <Link to='/gestionAulaList' >LISTA DE GESTION DE AULAS</Link>
                <Link to='/studentForm' >GUARDAR ESTUDIANTES</Link>
                <Link to='/studentList' >LISTA DE ESTUDIANTES </Link>
                <Link to='/docenteFrom' >GUARDAR DOCENTE</Link>
                <Link to='/docenteList' >LISTA DE DOCENTES</Link>
                <Link to='/planEstudioFrom' >GUARDAR PLAN ESTUDIO</Link>
                <Link to='/planEstudioList' >LISTA DE PLAN DE ESTUDIOS</Link>
                <Link to='/courseFrom' >GUARDAR CURSO</Link>
                <Link to='/courseList' >LISTA DE CURSOS</Link>
                <Link to='/preriquisitoCursoFrom' >GUARDAR PRERREQUISITO DE CURSO</Link>
                <Link to='/preriquisitoCursoList' >LISTA DE PRERREQUISITO DE CURSOS</Link>

                <Link to='/periodoAcademicoFrom' >GUARDAR PERIODO ACADEMICO</Link>
                <Link to='/periodoAcademicoList' >LISTA DE PERIODO ACADEMICO</Link>
                <Link to='/gestioGrupoFrom' >GUARDAR GESTION DE GRUPOS</Link>
                <Link to='/gestioGrupoList' >LISTA DE GESTION DE GRUPOS</Link>
                <Link to='/matriculaFrom' >GUARDAR MATRICULA</Link>
                <Link to='/matriculaList' >LISTA DE MATRICULA</Link>
                <Link to='/notaFrom' >GUARDAR NOTA</Link>
                <Link to='/notaList' >LISTA DE NOTAS</Link>
                
                
                
            </nav>
        </div>
    );
}

export default Navegador;