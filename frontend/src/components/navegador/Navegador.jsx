import React from 'react';
import { Link } from 'react-router-dom';
import stilo from './navegadorStilo.module.css'

const Navegador = () => {
    return (
        <div >            
            <nav className={stilo}>
                <Link to='/'> Inicio</Link>
                <Link to='/studentForm' > FORMULARIO DE GUARDAR</Link>
                <Link to='/studentList' > EDITAR Y ELIMNAR </Link>
                <Link to='/userList' > Lista de Usuarios </Link>
                <Link to='/userFrom' > guardar usuario</Link>
            </nav>
        </div>
    );
}

export default Navegador;