import express from "express";
import {
    getArea,
    getAreaById,
    createArea,
    updateArea,
    deleteArea
} from "../controllers/Area.js";

import { verifyPersonalAdmin,adminOnly } from "../middleware/AuthAdmin.js";

const router = express.Router();

router.get('/area', getArea);
router.get('/area/:id', getAreaById);
router.post('/area', verifyPersonalAdmin, adminOnly, createArea);
router.patch('/area/:id',verifyPersonalAdmin,adminOnly, updateArea);
router.delete('/area/:id',verifyPersonalAdmin, adminOnly,deleteArea);


export default router;