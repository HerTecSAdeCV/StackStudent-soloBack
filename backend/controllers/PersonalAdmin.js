import PersonalAdmin from "../models/PersonalAdminModel.js";
import argon2 from "argon2";

export const getPersonal = async(req, res) => {
    try{
        const response = await PersonalAdmin.findAll({
            attributes: ['idPersonalAdmin', 'nombre','apellidoP','apellidoM','correoInstitucional','estado'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getPersonalById = async(req, res) => {
    try{
        const response = await PersonalAdmin.findOne({
            attributes: ['idPersonalAdmin', 'nombre','apellidoP','apellidoM','correoInstitucional','estado'],
            where:{
                idPersonalAdmin: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createPersonal = async(req, res) => {
    const{nombre, apellidoP, apellidoM, matricula, correoInstitucional, contraseña, confcontraseña, estado, rol, Carrera_idCarrera, Carrera_Area_idArea} = req.body;
    if(contraseña !== confcontraseña) return res.status(400).json({msg: "Password Incorrecta"});
    const hashPassword = await argon2.hash(contraseña);
    try{
        await PersonalAdmin.create({
            nombre: nombre,
            apellidoP: apellidoP,
            apellidoM: apellidoM,
            matricula: matricula,
            correoInstitucional: correoInstitucional,
            contraseña: hashPassword,
            estado: estado,
            rol: rol,
            Carrera_idCarrera: Carrera_idCarrera,
            Carrera_Area_idArea: Carrera_Area_idArea
        });
        res.status(201).json({msg: "Personal Creado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const updatePersonal = async(req, res) => {
    const personalAdmin = await PersonalAdmin.findOne({
        where:{
            idPersonalAdmin: req.params.id
        }
    });
    if(!personalAdmin) return res.status(404).json({msg: "Personal No Actualizado"});
    const{nombre, apellidoP, apellidoM, matricula, correoInstitucional, contraseña, confcontraseña, estado, rol, Carrera_idCarrera, Carrera_Area_idArea} = req.body;
    let hashPassword;
    if(contraseña === "" || contraseña === null){
        hashPassword = personalAdmin.contraseña
    }else{
        hashPassword = await argon2.hash(contraseña);
    }
    if(contraseña !== confcontraseña) return res.status(400).json({msg: "Password Incorrecta"});
    try{
        await PersonalAdmin.update({
            nombre: nombre,
            apellidoP: apellidoP,
            apellidoM: apellidoM,
            matricula: matricula,
            correoInstitucional: correoInstitucional,
            contraseña: hashPassword,
            estado: estado,
            rol: rol,
            Carrera_idCarrera: Carrera_idCarrera,
            Carrera_Area_idArea: Carrera_Area_idArea
        },{
            where: {
                id: personalAdmin.id
            }
        }
        );
        res.status(200).json({msg: "Personal Actualizada"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }

}

export const deletePersonal = async(req, res) => {
    const personalAdmin = await PersonalAdmin.findOne({
        where:{
            idPersonalAdmin: req.params.id
        }
    });
    if(!personalAdmin) return res.status(404).json({msg: "Personal no Eliminado"});
    try{
        await PersonalAdmin.destroy({
            where: {
                id: personalAdmin.id
            }
        }
        );
        res.status(200).json({msg: "Personal Borrado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }

}