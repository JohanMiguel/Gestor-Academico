'use strict';

import Teacher from "../teacher/teacher.model.js";
import Subject from "./subject.model.js";


// metodo para Guardar una Materia (SUBJECT)
export const saveSubject = async (req, res) => {
    const { nameSubject, status = true } = req.body;
    const { teacherId } = req.params;

    try {
        if (!nameSubject) {
            return res.status(400).json({
                success: false,
                message: 'El nombre del curso es obligatorio'
            });
        }

        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({
                success: false,
                message: 'Profesor no encontrado'
            });
        }
        const existingSubject = await Subject.findOne({ nameSubject, gestor: teacher._id, status: true });
        if (existingSubject) {
            return res.status(400).json({
                success: false,
                message: 'Ya existe un curso con ese nombre para este profesor'
            });
        }
        const subject = new Subject({
            nameSubject,
            gestor: teacher._id,
            status
        });
        await subject.save();

        res.status(200).json({
            success: true,
            subject
        });
    } catch (error) {
        console.error('Error al guardar el curso:', error);
        res.status(500).json({
            success: false,
            message: "Error al guardar el Curso",
            error: error.message || error
        });
    }
};


// Controlador para obtener los cursos de un profesor específico
export const getSubjectsByTeacher = async (req, res) => {
    const { teacherId } = req.params;

    try {
        const subjects = await Subject.find({ gestor: teacherId, status: true })
            .populate('gestor', 'firstName lastName') 
        if (!subjects || subjects.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron cursos para este profesor',
            });
        }

        const subjectsWithTeacherNames = subjects.map(subject => ({
            ...subject.toObject(),
            gestor: `${subject.gestor.firstName} ${subject.gestor.lastName}`
        }));

        res.status(200).json({
            success: true,
            subjects: subjectsWithTeacherNames,
        });
    } catch (error) {
        console.error('Error al obtener los cursos del profesor:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los cursos del profesor',
            error: error.message || error,
        });
    }
};


// Controlador para editar un curso
export const updateSubject = async (req, res) => {
    const { id } = req.params;
    const { nameSubject, status } = req.body;

    try {
        // Verificar si el curso existe
        const subject = await Subject.findById(id);
        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado'
            });
        }

        // Actualizar el curso
        if (nameSubject) subject.nameSubject = nameSubject;
        if (status !== undefined) subject.status = status; 

        await subject.save();

        res.status(200).json({
            success: true,
            subject
        });
    } catch (error) {
        console.error('Error al actualizar el curso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al actualizar el curso',
            error
        });
    }
}

// Controlador para eliminar (desactivar) un curso
export const deleteSubject = async (req, res) => {
    const { id } = req.params;

    try {
        const subject = await Subject.findById(id);

        if (!subject) {
            return res.status(404).json({
                success: false,
                message: 'Curso no encontrado'
            });
        }
        if (!subject.status) {
            return res.status(400).json({
                success: false,
                message: 'El curso ya está desactivado'
            });
        }
        subject.status = false;

        await subject.save();

        res.status(200).json({
            success: true,
            message: 'Curso desactivado exitosamente'
        });
    } catch (error) {
        console.error('Error al desactivar el curso:', error);
        res.status(500).json({
            success: false,
            message: 'Error al desactivar el curso',
            error: error.message || error
        });
    }
};
