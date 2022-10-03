import express from "express";
import {
    LoginPA,
    logOutPA,
    MePA
} from "../controllers/AuthP.js";

const router = express.Router();

router.get('/mePA', MePA);
router.post('/loginPA', LoginPA);
router.delete('/logoutPA', logOutPA);


export default router;