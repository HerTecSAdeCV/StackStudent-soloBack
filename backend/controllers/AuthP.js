import PersonalAdmin from "../models/PersonalAdminModel.js";
import argon2 from "argon2";

export const LoginPA = async (req, res) => {
    const personalAdmin = await PersonalAdmin.findOne({
        where: {
            correoInstitucional: req.body.correoInstitucional
        }
    });
    if(!personalAdmin) return res.status(404).json({msg: "Personal no Encontrado"});
    const match = await argon2.verify(personalAdmin.contraseña, req.body.contraseña);
    if(!match) return res.status(400).json({msg: "Contraseña Incorrecta"});
    req.session.userId = personalAdmin.idPersonalAdmin;
    const idPersonalAdmin = personalAdmin.idPersonalAdmin;
    const nombre = personalAdmin.nombre;
    const correoInstitucional = personalAdmin.correoInstitucional;
    const rol = personalAdmin.rol;
    res.status(200).json({idPersonalAdmin, nombre, correoInstitucional, rol});
}

export const MePA = async(req, res) => {
    if(!req.session.userId){
        return res.status(401).json({msg: "Ingrese su cuenta"})
    }
    const personalAdmin = await PersonalAdmin.findOne({
        attributes: ['idPersonalAdmin', 'nombre', 'correoInstitucional', 'rol'],
        where: {
            idPersonalAdmin: req.session.userId
        }
    });
    if(!personalAdmin) return res.status(404).json({msg: "Personal no Encontrado"});
    res.status(200).json(personalAdmin)
}

export const logOutPA = (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "No se pudo cerrar sesión"});
        res.status(200).json({msg: "Has cerrado Sesión"});
    });
}