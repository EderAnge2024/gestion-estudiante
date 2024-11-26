import React from 'react';
import { Link } from 'react-router-dom';
import style from './Navegadormenu.module.css'

const NavegadorMenu = () => {
    return (
        <div >            
            <nav className={style.padre}>
                <Link to='/navegadorMenu2' className={style.link}>MENU PRINCIPAL </Link>
            </nav>
        </div>
    );
}

export default NavegadorMenu;