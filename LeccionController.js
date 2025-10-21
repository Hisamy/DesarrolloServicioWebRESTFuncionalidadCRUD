import LeccionService from "../services/LeccionService.js"

const leccionService = new LeccionService();

export default class LeccionController {

    leccionesDummy = [
        {
            id: 1,
            titulo: "Introducción al Desarrollo Web",
            descripcion: "Fundamentos de HTML, CSS y JavaScript.",
            fecha_creacion: "2025-10-15T00:00:00.000Z",
            multimedia: [
                {
                    titulo: "Video Introductorio",
                    URL: "https://example.com/video-introduccion"
                },
            ],
            id_curso: "3",
            createdAt: "2025-10-15T12:00:00.000Z",
            updatedAt: "2025-10-15T12:00:00.000Z"
        },
        {
            id: 2,
            titulo: "Fundamentos de Node.js",
            descripcion: "Instalación, módulos y ejecución de proyectos.",
            fecha_creacion: "2025-10-16T00:00:00.000Z",
            multimedia: [
                {
                    titulo: "Guía de instalación",
                    URL: "https://example.com/guia-node"
                }
            ],
            id_curso: "3",
            createdAt: "2025-10-16T12:00:00.000Z",
            updatedAt: "2025-10-16T12:00:00.000Z"
        }
    ];

    agregarLeccion = async (req, res) => {
        const datosLeccion = req.body;

        if (!datosLeccion.titulo || !datosLeccion.fecha_creacion || !datosLeccion.id_curso) {
            return res.status(400).json({ message: "Error: Faltan datos obligatorios de la lección." });
        }

        const nuevaLeccion = {
            id: this.leccionesDummy.length + 1,
            ...datosLeccion,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.leccionesDummy.push(nuevaLeccion);

        return res.status(201).json({
            message: "Lección creada exitosamente.",
            leccion: nuevaLeccion
        });
    };

    obtenerLecciones = async (req, res) => {
        return res.status(200).json(this.leccionesDummy);
    };

    obtenerLeccionesPorId = async (req, res) => {
        const id = parseInt(req.params.id);
        const leccion = this.leccionesDummy.find(l => l.id === id);

        if (!leccion) {
            return res.status(404).json({ message: "Error: No se encontró la lección." });
        }

        return res.status(200).json(leccion);
    };

    actualizarLeccion = async (req, res) => {
        const id = parseInt(req.params.id);
        const dataLeccion = req.body;

        const index = this.leccionesDummy.findIndex(l => l.id === id);
        if (index === -1) {
            return res.status(404).json({ message: "Error: No se encontró la lección para actualizar." });
        }

        this.leccionesDummy[index] = {
            ...this.leccionesDummy[index],
            ...dataLeccion,
            updatedAt: new Date().toISOString()
        };

        return res.status(200).json({
            message: "Lección actualizada exitosamente.",
            leccion: this.leccionesDummy[index]
        });
    };

    eliminarLeccion = async (req, res) => {
        const id = parseInt(req.params.id);
        const index = this.leccionesDummy.findIndex(l => l.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Error: No se encontró la lección para eliminar." });
        }

        this.leccionesDummy.splice(index, 1);

        return res.status(204).send();
    };
}
