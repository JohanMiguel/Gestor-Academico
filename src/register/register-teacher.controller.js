import Teacher from "../teacher/teacher.model.js";  
import { hash, verify } from "argon2";

// Registro de profesor
export const registerTeacher = async (req, res) => {
    try {
        const { firstName, lastName, email, subject, password } = req.body;

        // Encriptar la contraseña
        const encryptedPassword = await hash(password);

        const teacher = new Teacher({
            firstName,
            lastName,
            email,
            subject,
            password: encryptedPassword
        });

        await teacher.save();

        return res.status(201).json({
            message: "Profesor registrado exitosamente",
            teacherDetails: {
                uid: teacher._id,  
                firstName: teacher.firstName,
                email: teacher.email,
                subject: teacher.subject
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: "Error en el registro del profesor",
            error: err.message
        });
    }
};


// metodo para login de Teacher
export const loginTeacher = async (req, res) => {
    const { email, password } = req.body;

    // Validar que el email y la contraseña no sean vacíos
    if (!email || !password) {
        return res.status(400).json({
            message: "Credenciales incompletas",
            error: "El email y la contraseña son requeridos"
        });
    }

    try {
        // Buscar al profesor por su correo
        const teacher = await Teacher.findOne({ email: email });

        // Verificar si el profesor existe
        if (!teacher) {
            return res.status(404).json({
                message: "Credenciales inválidas",
                error: "Email no encontrado"
            });
        }

        // Verificar la contraseña
        const validPassword = await verify(teacher.password, password);

        // Si la contraseña es incorrecta
        if (!validPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        // Si todo es correcto, devolver la respuesta con los detalles del profesor
        return res.status(200).json({
            message: "Inicio de sesión exitoso",
            teacherDetails: {
                uid: teacher._id,
                firstName: teacher.firstName,
                subject: teacher.subject
            }
        });
    } catch (err) {
        console.log("Error en el inicio de sesión:", err);
        return res.status(500).json({
            message: "Error en el inicio de sesión",
            error: err.message
        });
    }
};
