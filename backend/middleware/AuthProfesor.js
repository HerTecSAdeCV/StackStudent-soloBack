import Profesor from "../models/ProfesorModel.js";

export const verifyProfesor = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Ingrese su cuenta"})
    }
    const profesor = await Profesor.findOne({
        where: {
            idProfesor: req.session.userId
        }
    });
    if(!profesor) return res.status(404).json({msg: "Usuario no Encontrado"});
    req.userId = profesor.id;
    req.rol = profesor.rol;
    next();
}

export const profesorOnly = async (req, res, next) => {
    const profesor = await Profesor.findOne({
        where: {
            idProfesor: req.session.userId
        }
    });
    if(!profesor) return res.status(404).json({msg: "Usuario no encontrado"});
    if(profesor.rol !== "Profesor") return res.status(403).json({msg: "Acceso Prohibido"});
    next();
}