import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/DataBase.js";
import SequelizeStore from "connect-session-sequelize"
import AlumnoRoute from "./routes/AlumnoRoute.js";
import AreaRoute from "./routes/AreaRoute.js";
import GradoRoute from "./routes/GradoRoute.js";
import MateriaRoute from "./routes/MateriaRoute.js";
import MestudioRoute from "./routes/MestudioRoute.js";
import ProfesorRoute from "./routes/ProfesorRoute.js";
import AuthPRoute from "./routes/AuthPRoute.js";
import PersonalAdminRoute from "./routes/PersonalAdminRoute.js";
import CarreraRoute from "./routes/CarreraRoute.js";
import GrupoRoute from "./routes/GrupoRoute.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

//(async()=>{
//   await db.sync();
//})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(AlumnoRoute);
app.use(AreaRoute);
app.use(GradoRoute);
app.use(MateriaRoute);
app.use(MestudioRoute);
app.use(ProfesorRoute);
app.use(AuthPRoute);
app.use(PersonalAdminRoute);
app.use(CarreraRoute);
app.use(GrupoRoute);

//store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Servidor corriendo'); 
})