import React from 'react';
import { Link } from 'react-router-dom';
import style from './navegadorInicio.module.css'

const NavegadorInicio = () => {
    return (
        <div >            
            <nav className={style.container}>
                <Link to='/verNotaList' className={style.link}> VER NOTA DE ESTUDIANTES</Link>
            </nav>
        </div>
    );
}

export default NavegadorInicio;