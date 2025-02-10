import { Router } from "express";
// primero los metodos o funciones, luego la ruta de donde se encuantran estos metodos
import { saveSubject, getSubjectsByTeacher, deleteSubject, updateSubject } from "./subject.controller.js";

const router = Router();
//Ruta del metodo de Guardar Subject(materia)
router.post("/teacher/:teacherId/subjects", saveSubject);
//Ruta del metodo de Buscar Materia por Teache en Subject(materia)
router.get("/teacher/:teacherId/subjects", getSubjectsByTeacher);
//Ruta del metodo de Actualizar Subject(materia)
router.put("/subjects/:id", updateSubject);
//Ruta del metodo de eliminar Subject(materia)
router.delete("/delete/:id", deleteSubject);

export default router;
