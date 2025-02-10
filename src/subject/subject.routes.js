import { Router } from "express";
import { saveSubject, getSubjectsByTeacher, deleteSubject, updateSubject } from "./subject.controller.js";

const router = Router();

router.post("/teacher/:teacherId/subjects", saveSubject);
router.get("/teacher/:teacherId/subjects", getSubjectsByTeacher);
router.put("/subjects/:id", updateSubject);
router.delete("/delete/:id", deleteSubject);

export default router;
