import { Router } from "express";

//import { registerStudent, loginStudent } from './register-student.controller.js';
import { registerTeacher, loginTeacher } from "./register-teacher.controller.js";  
const router = Router();

router.post("/register", registerTeacher);

router.post("/login", loginTeacher);

export default router;
