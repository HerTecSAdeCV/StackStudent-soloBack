import express from "express";
import {
    getModeloEstudio,
    getModeloEstudioById,
    createModeloEstudio,
    updateModeloEstudio,
    deleteModeloEstudio
} from "../controllers/Mestudio.js";

import { verifyPersonalAdmin,adminOnly,  } from "../middleware/AuthAdmin.js";

const router = express.Router();

router.get('/modeloEstudio', getModeloEstudio);
router.get('/modeloEstudio/:id', getModeloEstudioById);
router.post('/modeloEstudio',verifyPersonalAdmin,adminOnly, createModeloEstudio);
router.patch('/modeloEstudio/:id',verifyPersonalAdmin,adminOnly, updateModeloEstudio);
router.delete('/modeloEstudio/:id',verifyPersonalAdmin,adminOnly,deleteModeloEstudio);

export default router;