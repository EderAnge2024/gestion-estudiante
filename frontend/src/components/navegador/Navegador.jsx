// Importaciones necesarias
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './Navegador.module.css';

// Array con las secciones y sus enlaces
const sections = [
    {
        title: 'Gestión de Aulas',
        links: [
            { path: '/gestionAulaFrom', label: 'GUARDAR GESTION DE AULAS' },
            { path: '/gestionAulaList', label: 'LISTA DE GESTION DE AULAS' },
        ],
    },
    {
        title: 'Estudiantes',
        links: [
            { path: '/studentForm', label: 'GUARDAR ESTUDIANTES' },
            { path: '/studentList', label: 'LISTA DE ESTUDIANTES' },
        ],
    },
    {
        title: 'Docentes',
        links: [
            { path: '/docenteFrom', label: 'GUARDAR DOCENTE' },
            { path: '/docenteList', label: 'LISTA DE DOCENTES' },
        ],
    },
    {
        title: 'Planes de Estudio',
        links: [
            { path: '/planEstudioFrom', label: 'GUARDAR PLAN ESTUDIO' },
            { path: '/planEstudioList', label: 'LISTA DE PLAN DE ESTUDIOS' },
        ],
    },
    {
        title: 'Cursos',
        links: [
            { path: '/courseFrom', label: 'GUARDAR CURSO' },
            { path: '/courseList', label: 'LISTA DE CURSOS' },
            { path: '/preriquisitoCursoFrom', label: 'GUARDAR PRERREQUISITO DE CURSO' },
            { path: '/preriquisitoCursoList', label: 'LISTA DE PRERREQUISITO DE CURSOS' },
        ],
    },
    {
        title: 'Periodos Académicos',
        links: [
            { path: '/periodoAcademicoFrom', label: 'GUARDAR PERIODO ACADEMICO' },
            { path: '/periodoAcademicoList', label: 'LISTA DE PERIODO ACADEMICO' },
        ],
    },
    {
        title: 'Grupos',
        links: [
            { path: '/gestioGrupoFrom', label: 'GUARDAR GESTION DE GRUPOS' },
            { path: '/gestioGrupoList', label: 'LISTA DE GESTION DE GRUPOS' },
        ],
    },
    {
        title: 'Matrículas',
        links: [
            { path: '/matriculaFrom', label: 'GUARDAR MATRICULA' },
            { path: '/matriculaList', label: 'LISTA DE MATRICULA' },
        ],
    },
    {
        title: 'Notas',
        links: [
            { path: '/notaFrom', label: 'GUARDAR NOTA' },
            { path: '/notaList', label: 'LISTA DE NOTAS' },
        ],
    },
];

// Componente Navegador
const Navegador = () => {
    const navigate = useNavigate(); // Hook para manejar la navegación "Atrás"

    return (
        <div>
            {/* Botones de navegación (Inicio y Atrás) */}
            <div className={style.navigationButtons}>
                <button onClick={() => navigate(-1)} className={style.backButton}>
                    Atrás
                </button>
                <Link to="/" className={style.homeButton}>
                    Cerrar sesion
                </Link>
            </div>

            {/* Menú de navegación por secciones */}
            <nav className={style.nav}>
                {sections.map((section, index) => (
                    <div key={index} className={style.section}>
                        <h3>{section.title}</h3>
                        {section.links.map((link, idx) => (
                            <Link key={idx} to={link.path} className={style.navLink}>
                                {link.label}
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>
        </div>
    );
};

// Exportación del componente
export default Navegador;
