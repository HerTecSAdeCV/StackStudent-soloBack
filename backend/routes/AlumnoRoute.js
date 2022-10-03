import express from "express";
import {
    getAlumnos,
    getAlumnosById,
    createAlumnos,
    updateAlumnos,
    deleteAlumnos
} from "../controllers/Alumno.js";

const router = express.Router();

router.get('/alumnos', getAlumnos);
router.get('/alumnos/:id', getAlumnosById);
router.post('/alumnos', createAlumnos);
router.patch('/alumnos/:id', updateAlumnos);
router.delete('/alumnos/:id',deleteAlumnos);

export default router;