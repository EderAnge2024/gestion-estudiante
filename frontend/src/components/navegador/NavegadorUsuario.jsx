import React from 'react';
import { Link } from 'react-router-dom';
import stilo from './navegadorMneuStilo.module.css'

const NavegadorUsuario = () => {
    return (
        <div >            
            <nav className={stilo.nav}>
                <Link to='/'> Inicio</Link>
                <Link to='/userFrom' >GUARDAR USUARIO</Link>
                <Link to='/userList' >LISTA DE USUARIOS </Link>
                <Link to='/rolFrom' >GUARDAR ROL</Link>
                <Link to='/rolList' >LISTA DE ROL</Link>
                <Link to='/actividadFrom' >GUARDAR ACTIVIDAD</Link>
                <Link to='/actividadList' >LISTA DE ACTIVIDADES</Link>
                <Link to='/permisoFrom' >GUARDAR PERMISO</Link>
                <Link to='/permisoList' >LISTA DE PERMISOS</Link>
            </nav>
        </div>
    );
}

export default NavegadorUsuario;