import { Router } from "express";
import { getTeacherById, getTeachers, deleteTeacher, updateTeacher } from "./teacher.controller.js";

const router = Router();
router.get("/", getTeachers);
router.get("/findTeacher/:uid", getTeacherById);
router.patch("/updateTeacher/:uid", updateTeacher);
router.delete("/deleteTeacher/:uid", deleteTeacher);



export default router;
