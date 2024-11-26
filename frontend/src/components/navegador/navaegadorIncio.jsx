import React from 'react';
import { Link } from 'react-router-dom';
import stilo from './navegadorStilo.module.css'

const NavegadorInicio = () => {
    return (
        <div >            
            <nav className={stilo.padre}>
                <Link to='/verNotaList' className={stilo.link}> VER NOTA DE ESTUDIANTES</Link>
            </nav>
        </div>
    );
}

export default NavegadorInicio;