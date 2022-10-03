import PersonalAdmin from "../models/PersonalAdminModel.js";

export const verifyPersonalAdmin = async (req, res, next) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Ingrese su cuenta"})
    }
    const personalAdmin = await PersonalAdmin.findOne({
        where: {
            idPersonalAdmin: req.session.userId
        }
    });
    if(!personalAdmin) return res.status(404).json({msg: "Usuario no Encontrado"});
    req.userId = personalAdmin.id;
    req.rol = personalAdmin.rol;
    next();
}

export const adminOnly = async (req, res, next) => {
    const personalAdmin = await PersonalAdmin.findOne({
        where: {
            idPersonalAdmin: req.session.userId
        }
    });
    if(!personalAdmin) return res.status(404).json({msg: "Usuario no encontrado"});
    if(personalAdmin.rol !== "Rector") return res.status(403).json({msg: "Acceso Prohibido"});
    next();
}