const Nota = require('../models/Nota');
const Course = require('../models/Course');
const Student = require('../models/Student');

// Función para obtener las notas de los estudiantes con detalles
async function obtenerNotasConDetalles(req, res) {
    try {
        const notas = await Nota.findAll({
            attributes: ['notaId', 'fecha_ingre_nota', 'nota'],
            include: [
                {
                    model: Course,
                    attributes: ['nombre'], // Nombre del curso
                },
                {
                    model: Student,
                    attributes: ['nombre'], // Nombre del estudiante
                },
            ],
        });

        // Crear el resultado con los nombres del estudiante y curso por separado
        const resultado = notas.map(nota => ({
            notaId: nota.notaId,
            fechaIngreso: nota.fecha_ingre_nota,
            nota: nota.nota,
            nombreEstudiante: nota.Student?.nombre, // Nombre del estudiante
            nombreCurso: nota.Course?.nombre,       // Nombre del curso
        }));

        res.status(200).json(resultado);
    } catch (error) {
        console.error('Error al obtener las notas:', error);
        res.status(500).json({ error: 'Error al obtener las notas' });
    }
}

module.exports = {
    obtenerNotasConDetalles,
};
