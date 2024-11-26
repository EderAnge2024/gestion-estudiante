import React from 'react';
import { Link } from 'react-router-dom';
import style from './navegadorUsuarioParticipantes.module.css'

const NavegadorMenu2 = () => {
    return (
        <div >            
            <nav className={style.padre}>
                <Link to='/' className={style.link}>INICIO</Link>
                <Link to='/navegadorIntegrantes' className={style.link}>AGREGAR INTEGRANTES </Link>
                <Link to='/navegadorUsuario' className={style.link}>AGREGAR USUARIOS </Link>
            </nav>
        </div>
    );
}

export default NavegadorMenu2;