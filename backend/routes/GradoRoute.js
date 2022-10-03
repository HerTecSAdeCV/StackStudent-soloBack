import express from "express";
import {
    getGrado,
    getGradoById,
    createGrado,
    updateGrado,
    deleteGrado
} from "../controllers/Grado.js";

import { verifyPersonalAdmin,adminOnly, } from "../middleware/AuthAdmin.js";

const router = express.Router();

router.get('/grado', getGrado);
router.get('/grado/:id', getGradoById);
router.post('/grado', verifyPersonalAdmin,adminOnly,createGrado);
router.patch('/grado/:id', verifyPersonalAdmin,adminOnly, updateGrado);
router.delete('/grado/:id', verifyPersonalAdmin,adminOnly,deleteGrado);

export default router;