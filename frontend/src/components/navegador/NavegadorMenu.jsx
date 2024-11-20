import React from 'react';
import { Link } from 'react-router-dom';
import stilo from './navegadorStilo.module.css'

const NavegadorMenu = () => {
    return (
        <div >            
            <nav className={stilo.padre}>
                <Link to='/menu' className={stilo.link}> REGRESAR AL MENU </Link>
            </nav>
        </div>
    );
}

export default NavegadorMenu;