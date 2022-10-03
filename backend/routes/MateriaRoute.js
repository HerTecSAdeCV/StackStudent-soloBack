import express from "express";
import {
    getMateria,
    getMateriaById,
    createMateria,
    updateMateria,
    deleteMateria
} from "../controllers/Materia.js";

const router = express.Router();

router.get('/materia', getMateria);
router.get('/materia/:id', getMateriaById);
router.post('/materia', createMateria);
router.patch('/materia/:id', updateMateria);
router.delete('/materia/:id',deleteMateria);

export default router;