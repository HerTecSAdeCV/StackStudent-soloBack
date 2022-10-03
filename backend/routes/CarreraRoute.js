import express from "express";
import {
    getCarrera,
    getCarreraById,
    createCarrera,
    updateCarrera,
    deleteCarrera
} from "../controllers/Carrera.js";

import { verifyPersonalAdmin, adminOnly } from "../middleware/AuthAdmin.js";

const router = express.Router();

router.get('/carrera', getCarrera);
router.get('/carrera/:id', getCarreraById);
router.post('/carrera',verifyPersonalAdmin,adminOnly, createCarrera);
router.patch('/carrera/:id',verifyPersonalAdmin,adminOnly, updateCarrera);
router.delete('/carrera/:id',verifyPersonalAdmin,adminOnly,deleteCarrera);


export default router;