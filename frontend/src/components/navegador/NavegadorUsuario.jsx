// Importaciones necesarias
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import style from './NavegadorUsuario.module.css';

// Array con las secciones y sus enlaces
const sections = [
    {
        title: 'Usuarios',
        links: [
            { path: '/userFrom', label: 'GUARDAR USUARIO' },
            { path: '/userList', label: 'LISTA DE USUARIOS' },
        ],
    },
    {
        title: 'Roles',
        links: [
            { path: '/rolFrom', label: 'GUARDAR ROL' },
            { path: '/rolList', label: 'LISTA DE ROLES' },
        ],
    },
    {
        title: 'Actividades',
        links: [
            { path: '/actividadFrom', label: 'GUARDAR ACTIVIDAD' },
            { path: '/actividadList', label: 'LISTA DE ACTIVIDADES' },
        ],
    },
    {
        title: 'Permisos',
        links: [
            { path: '/permisoFrom', label: 'GUARDAR PERMISO' },
            { path: '/permisoList', label: 'LISTA DE PERMISOS' },
        ],
    },
];

// Componente NavegadorUsuario
const NavegadorUsuario = () => {
    const navigate = useNavigate(); // Hook para la navegación "Atrás"

    return (
        <div>
            {/* Botones de navegación superior */}
            <div className={style.navigationButtons}>
                <button onClick={() => navigate(-1)} className={style.backButton}>
                    Atrás
                </button>
                <Link to="/" className={style.homeButton}>
                    cerrar sesion
                </Link>
            </div>

            {/* Barra de navegación principal */}
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
export default NavegadorUsuario;

