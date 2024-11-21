import React from 'react';
import { Link } from 'react-router-dom';
import stilo from './navegadorStilo.module.css'

const NavegadorMenu = () => {
    return (
        <div >            
            <nav className={stilo.padre}>
                <Link to='/navegadorMenu2' className={stilo.link}>MENU PRINCIPAL </Link>
            </nav>
        </div>
    );
}

export default NavegadorMenu;