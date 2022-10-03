import express from "express";
import {
    getProfesor,
    getProfesorById,
    createProfesor,
    updateProfesor,
    deleteProfesor
} from "../controllers/Profesor.js";

const router = express.Router();

router.get('/profesor', getProfesor);
router.get('/profesor/:id', getProfesorById);
router.post('/profesor',createProfesor);
router.patch('/profesor/:id', updateProfesor);
router.delete('/profesor/:id',deleteProfesor);

export default router;