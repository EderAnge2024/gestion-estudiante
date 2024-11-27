// routes/authRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Usuario');  // Importamos el modelo de usuario

const router = express.Router();

// Ruta para autenticación
router.post('/usuario', async (req, res) => {
    const { nombreUsuario, contraseña } = req.body;

    try {
        // Buscar al usuario en la base de datos
        const usuario = await User.findOne({ where: { nombreUsuario } });

        // Verificar si el usuario existe
        if (!usuario) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        // Comparar la contraseña proporcionada con la almacenada en la base de datos
        const esCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);

        if (!esCorrecta) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        // Crear un token JWT para mantener la sesión del usuario
        const token = jwt.sign({ usuarioId: usuario.usuarioId }, 'secret_key', { expiresIn: '1h' });

        // Enviar el token al frontend
        res.json({ token, usuario: usuario.nombreUsuario });

    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;
