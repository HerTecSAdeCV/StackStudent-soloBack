import express from "express";
import {
    getGrupo,
    getGrupoById,
    createGrupo,
    updateGrupo,
    deleteGrupo
} from "../controllers/Grupo.js";

const router = express.Router();

router.get('/grupo', getGrupo);
router.get('/grupo/:id', getGrupoById);
router.post('/grupo', createGrupo);
router.patch('/grupo/:id', updateGrupo);
router.delete('/grupo/:id',deleteGrupo);

export default router;