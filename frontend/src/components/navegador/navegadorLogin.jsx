import React from 'react';
import { Link } from 'react-router-dom';
import style from './navegadorLogin.module.css'

const NavegadorLogin = () => {
    return (
        <div >            
            <nav className={style.padre}>
                <Link to='/' className={style.link}> INICIO </Link>
            </nav>
        </div>
    );
}

export default NavegadorLogin;