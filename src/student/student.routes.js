import { Router } from "express";
import { getStudentById, getStudents, deleteStudent, updateStudent,asignarCurso } from "./student.controller.js";

const router = Router();

router.get("/findStudent/:uid", getStudentById);

router.get("/", getStudents);

router.delete("/deleteStudent/:uid", deleteStudent);

router.patch("/updateStudent/:uid", updateStudent);

router.post("/addCurso", asignarCurso);

export default router;
