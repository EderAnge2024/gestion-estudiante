import React from 'react';
import { Link } from 'react-router-dom';
import stilo from './navegadorStilo.module.css'

const NavegadorLogin = () => {
    return (
        <div >            
            <nav className={stilo.padre}>
                <Link to='/' className={stilo.link}> Inicio </Link>
            </nav>
        </div>
    );
}

export default NavegadorLogin;