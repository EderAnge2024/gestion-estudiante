import React from 'react';
import { Link } from 'react-router-dom';
import stilo from './navegadorStilo.module.css'

const NavegadorMenu2 = () => {
    return (
        <div >            
            <nav className={stilo.padre}>
                <Link to='/' className={stilo.link}>INICIO</Link>
                <Link to='/navegadorIntegrantes' className={stilo.link}>AGREGAR INTEGRANTES </Link>
                <Link to='/navegadorUsuario' className={stilo.link}>AGREGAR USUARIOS </Link>
            </nav>
        </div>
    );
}

export default NavegadorMenu2;