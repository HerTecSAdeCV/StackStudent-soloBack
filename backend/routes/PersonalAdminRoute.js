import express from "express";
import {
    getPersonal,
    getPersonalById,
    createPersonal,
    updatePersonal,
    deletePersonal
} from "../controllers/PersonalAdmin.js";

import { verifyPersonalAdmin, adminOnly, } from "../middleware/AuthAdmin.js";

const router = express.Router();

router.get('/personal', getPersonal);
router.get('/personal/:id', getPersonalById);
router.post('/personal', verifyPersonalAdmin,adminOnly, createPersonal);
router.patch('/personal/:id',verifyPersonalAdmin,adminOnly, updatePersonal);
router.delete('/personal/:id',verifyPersonalAdmin,adminOnly,deletePersonal);

export default router;