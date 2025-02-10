"use strict"

import express from 'express'
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import { dbConnection } from './mongo.js'
// para student
import registerSRoutes from "../src/register/resgiter-student.routes.js"
import studentRoutes from "../src/student/student.routes.js"
// para teacher
import registerTRoutes from "../src/register/register-teacher.routes.js"
import teacherRoutes from "../src/teacher/teacher.routes.js"
// para subject
import subjectRoutes from "../src/subject/subject.routes.js"
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) => {
    app.use("/gestor/v1/registro", registerSRoutes) //ruta de registro para ESTUDIANTE
    app.use("/gestor/v1/student", studentRoutes)    //ruta para el archivo de rutas ESTUDIANTES
    app.use("/gestor/v1/registrot", registerTRoutes)//ruta de registro para TEACHER
    app.use("/gestor/v1/teacher", teacherRoutes)    //ruta para el archivo de rutas de TEACHER
    app.use("/gestor/v1/subject", subjectRoutes)    //para el archivo de rutas de Materias
}

const conectarDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port: ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}