import Teacher from "./teacher.model.js";

// Obtener un profesor por su ID
export const getTeacherById = async (req, res) => {
    try {
        const { uid } = req.params;
        const teacher = await Teacher.findById(uid);

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado",
                error: "No se ha encontrado un profesor con este ID"
            });
        }

        return res.status(200).json({
            success: true,
            teacher
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el profesor",
            error: err.message
        });
    }
};

// Obtener una lista de profesores
export const getTeachers = async (req, res) => {
    try {
        const { limits = 3, from = 0 } = req.query;
        const query = { status: true };

        const [total, teachers] = await Promise.all([
            Teacher.countDocuments(query),
            Teacher.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ]);

        return res.status(200).json({
            success: true,
            total,
            teachers
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar los profesores",
            error: err.message
        });
    }
};

// Eliminar un profesor
export const deleteTeacher = async (req, res) => {
    try {
        const { uid } = req.params;
        const teacher = await Teacher.findByIdAndUpdate(uid, { status: false }, { new: true });

        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Profesor eliminado",
            teacher
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el profesor",
            error: err.message
        });
    }
};

// Actualizar datos de un profesor
export const updateTeacher = async (req, res) => {
    try {
        const { uid } = req.params;  // Recuperamos el UID del profesor
        const data = req.body;  // Los nuevos datos del profesor

        // Buscamos al profesor por su ID
        const teacher = await Teacher.findById(uid);

        // Si no se encuentra al profesor, respondemos con un error 404
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: "Profesor no encontrado",
            });
        }

        // Si el profesor es encontrado, actualizamos sus datos
        const updatedTeacher = await Teacher.findByIdAndUpdate(uid, data, { new: true });

        // Devolvemos una respuesta con el profesor actualizado
        return res.status(200).json({
            success: true,
            message: "Profesor actualizado exitosamente",
            teacher: updatedTeacher
        });

    } catch (err) {
        // Si ocurre un error, respondemos con un error 500
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el profesor",
            error: err.message
        });
    }
};



