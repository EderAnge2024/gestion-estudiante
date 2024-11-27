import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavegadorIncicio from '../navegador/navegadorInicio';
import style from "./Login.module.css";
import logosuiza from "../IMG/logosuiza.png";
import suiza from "../IMG/Suiza.jpg";

const Login = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/contra/usuario",
        { nombreUsuario, contraseña }
      );

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        setMensaje(`Bienvenido, ${response.data.usuario}`);
        setError(null);

        navigate('/navegadorMenu2');
      }
    } catch (error) {
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className={style.loginWrapper}>
      <h1 className={style.header}>
        Instituto de Educación Superior Tecnológico Público Suiza
      </h1>

      <div className={style.loginContainer}>
        <div className={style.titleContainer}>
          <div className={style.logo}>
            <img src={logosuiza} alt="Logo Suiza" />
          </div>
          <div>
            <h1 className={style.welcome}>Bienvenidos</h1>
            <h1 className={style.loginTitle}>Iniciar sesión</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={style.loginForm}>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            className={style.input}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className={style.input}
          />
          <button className={style.button} type="submit">
            Iniciar sesión
          </button>
        </form>

        {mensaje && <div className={style.message}>{mensaje}</div>}
        {error && <div className={style.error}>{error}</div>}
      </div>

      <div className={style.backgroundImage}>
        <img src={suiza} alt="Imagen Suiza" />
      </div>

      <div>
        <NavegadorIncicio />
      </div>
    </div>
  );
};

export default Login;
