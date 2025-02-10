import { Router } from "express";

import { registerTeacher, loginTeacher } from "./register-teacher.controller.js";  
const router = Router();

//ruta del metodo register Teacher
router.post("/register", registerTeacher);
//ruta del metodo login para teacher
router.post("/login", loginTeacher);

export default router;
