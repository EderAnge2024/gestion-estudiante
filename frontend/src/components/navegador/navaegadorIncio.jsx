import React from 'react';
import { Link } from 'react-router-dom';
import stilo from './navegadorStilo.module.css'

const NavegadorIncicio = () => {
    return (
        <div >            
            <nav className={stilo.padre}>
                <Link to='/verNotaList' className={stilo.link}> Nota de estudiantes </Link>
            </nav>
        </div>
    );
}

export default NavegadorIncicio;