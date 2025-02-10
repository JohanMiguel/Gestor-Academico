import { Router } from "express";
// se agregan lso metodos o funciones del controlador para usarlos en rutas
import { getTeacherById, getTeachers, deleteTeacher, updateTeacher } from "./teacher.controller.js";

const router = Router();
// Se listan los Teacher
router.get("/", getTeachers);
//Se busca un Teacher directo
router.get("/findTeacher/:uid", getTeacherById);
//Ruta del metodo de actualizar Teacher
router.patch("/updateTeacher/:uid", updateTeacher);
//Ruta del metodo de eliminar Teacher por id
router.delete("/deleteTeacher/:uid", deleteTeacher);



export default router;
