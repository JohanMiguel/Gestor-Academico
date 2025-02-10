import { hash, verify } from "argon2"
import Student from "./student.model.js"
import Subject from "../subject/subject.model.js ";



export const getStudentById = async (req, res) => {
    try {
        const { uid } = req.params
        const student = await Student.findById(uid)

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no existe",
                error: "No se ha encontrado un estudiante con este ID"
            })
        }

        return res.status(200).json({
            success: true,
            student
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al obtener el estudiante",
            error: err.message
        })
    }
}

export const getStudents = async (req, res) => {
    try {
        const { limits = 3, from = 0 } = req.query
        const query = { status: true }

        const [total, students] = await Promise.all([
            Student.countDocuments(query),
            Student.find(query)
                .skip(Number(from))
                .limit(Number(limits))
        ])

        return res.status(200).json({
            success: true,
            total,
            students
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar los estudiantes",
            error: err.message
        })
    }
}

// Eliminar estudiante
export const deleteStudent = async (req, res) => {
    try {
        const { uid } = req.params
        const student = await Student.findByIdAndUpdate(uid, { status: false }, { new: true })

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Estudiante Eliminado",
            student
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el estudiante",
            error: err.message
        })
    }
}

// Atualixar datos de un estudiante mediante su ID
export const updateStudent = async (req, res) => {
    try {
        const { uid } = req.params;  // Recuperamos el UID del estudiante
        const data = req.body;  // Los nuevos datos del estudiante

        // Buscamos al estudiante por su ID
        const student = await Student.findById(uid);

        // Si no se encuentra al estudiante, respondemos con un error 404
        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Estudiante no encontrado",
            });
        }

        // Si el estudiante es encontrado, actualizamos sus datos
        const updatedStudent = await Student.findByIdAndUpdate(uid, data, { new: true });

        // Devolvemos una respuesta con el estudiante actualizado
        return res.status(200).json({
            success: true,
            message: "Estudiante actualizado exitosamente",
            student: updatedStudent
        });

    } catch (err) {
        // Si ocurre un error, respondemos con un error 500
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el estudiante",
            error: err.message
        });
    }
};




export const asignarCurso = async (req, res) => {
    const { studentId, subjectId } = req.body;
  
    try {
      // Buscar al estudiante
      const student = await Student.findById(studentId);
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Estudiante no encontrado"
        });
      }
  
      // Buscar el curso
      const subject = await Subject.findById(subjectId);
      if (!subject) {
        return res.status(404).json({
          success: false,
          message: "Curso no encontrado"
        });
      }
  
      // Verificar si el estudiante ya está inscrito en 3 cursos
      if (student.subjects.length >= 3) {
        return res.status(400).json({
          success: false,
          message: "El estudiante ya está inscrito en 3 cursos"
        });
      }
  
      // Verificar si el estudiante ya está inscrito en el curso
      if (student.subjects.includes(subjectId)) {
        return res.status(400).json({
          success: false,
          message: "El estudiante ya está inscrito en este curso"
        });
      }
  
      // Inscribir al estudiante en el curso
      student.subjects.push(subjectId);
      await student.save();
  
      res.status(200).json({
        success: true,
        message: "Curso agregado exitosamente",
        student
      });
    } catch (error) {
      console.error("Error al inscribir al estudiante:", error);
      res.status(500).json({
        success: false,
        message: "Error al inscribir al estudiante en el curso",
        error: error.message
      });
    }
  }
