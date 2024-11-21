import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavegadorIncicio from '../navegador/navaegadorIncio';
import style from "./login.module.css";
import logosuiza from "../IMG/logosuiza.png";
import suiza from "../IMG/Suiza.jpg";

const Login = () => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Hook para redirigir al usuario

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/contra/usuario', { nombreUsuario, contraseña });

            if (response.data.token) {
                // Guardamos el token en localStorage
                localStorage.setItem("authToken", response.data.token);
                setMensaje(`Bienvenido, ${response.data.usuario}`);
                setError(null); // Limpiar errores previos

                // Redirigir al usuario al dashboard
                navigate('/navegadorMenu2');
            }
        } catch (error) {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
                <div className={style.loginWrapper}>
          <h1 className={style.cabeza}>
            Instituto de Educación Superior Tecnológico Público Suiza
          </h1>
        
          <div className={style.logincontainer}>
            <div className={style.tituloContainer}>
              <div className={style.logo}>
                <img src={logosuiza} alt="Logo Suiza" />
              </div>
              <div>
                <h1 className={style.bienvenido}>Bienvenidos</h1>
                <h1 className={style.ini}>Iniciar sesión</h1>
              </div>
            </div>
        
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Nombre de usuario"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                className="input"
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className="input"
              />
              <button className={style.button} type="submit">
                Iniciar sesión
              </button>
            </form>
        
            {mensaje && <div className={style.mensaje}>{mensaje}</div>}
            {error && <div className={style.error}>{error}</div>}
          </div>
        
          {/* Imagen de fondo alineada al lado derecho */}
          <div className={style.suiza}>
            <img src={suiza} alt="Imagen Suiza" />
          </div>
        
          <div>
            <NavegadorIncicio />
          </div>
        </div>
    );
};

export default Login;
