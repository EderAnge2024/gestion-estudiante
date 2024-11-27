import React from 'react';
import { Link } from 'react-router-dom';
import style from './navegadorUsuarioParticipantes.module.css'
import suiza from "../IMG/Suiza.jpg"


const NavegadorMenu2 = () => {
    return (
        <div >            
            <nav className={style.padre}>
                <Link to='/' className={style.salir}>SALIR</Link>
                <Link to='/navegadorIntegrantes' className={style.link}>AGREGAR INTEGRANTES </Link>
                <Link to='/navegadorUsuario' className={style.link}>AGREGAR USUARIOS </Link>
            </nav>
            <div className={style.suiza}>
            <img src={suiza} alt="Imagen Suiza" />
          </div>
        </div>
    );
}

export default NavegadorMenu2;