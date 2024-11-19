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
                <Link to='/gestionAulaFrom' > guardar Aula</Link>
                <Link to='/gestionAulaList' > lista Aula</Link>
                <Link to='/planEstudioFrom' > guardar plan estudio</Link>
                <Link to='/planEstudioList' > lista plan de estuido</Link>
                <Link to='/preriquisitoCursoFrom' > guardar prerrequisito del curso</Link>
                <Link to='/preriquisitoCursoList' > lista de prerrequisito del curso</Link>
                <Link to='/rolFrom' > guardar rol</Link>
                <Link to='/rolList' > lista de rol</Link>
            </nav>
        </div>
    );
}

export default Navegador;