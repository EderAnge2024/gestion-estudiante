import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import NavegadorIncicio from '../navegador/navaegadorIncio';

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
                navigate('/studentList');
            }
        } catch (error) {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div>
            <div><NavegadorIncicio></NavegadorIncicio></div>
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                />
                <button type="submit">Iniciar sesión</button>
            </form>

            {mensaje && <div>{mensaje}</div>}
            {error && <div>{error}</div>}
        </div>
    );
};

export default Login;
