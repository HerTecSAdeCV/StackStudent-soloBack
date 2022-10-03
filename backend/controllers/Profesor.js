import Profesor from "../models/ProfesorModel.js";
import argon2 from "argon2";

export const getProfesor = async(req, res) => {
    try{
        const response = await Profesor.findAll({
            attributes: ['idProfesor', 'nombreProfesor','apellidopProfesor','apellidomProfesor','correoInstitucional','estado'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getProfesorById = async(req, res) => {
    try{
        const response = await Profesor.findOne({
            attributes: ['idProfesor', 'nombreProfesor','apellidopProfesor','apellidomProfesor','correoInstitucional','estado'],
            where:{
                idProfesor: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createProfesor = async(req, res) => {
    const{nombreProfesor, apellidopProfesor, apellidomProfesor, telefonoProfesor, correoPersonal, matriculaProfesor, correoInstitucional, contraseña, confcontraseña, estado, rfcProfesor} = req.body;
    if(contraseña !== confcontraseña) return res.status(400).json({msg: "Password Incorrecta"});
    const hashPassword = await argon2.hash(contraseña);
    try{
        await Profesor.create({
            nombreProfesor: nombreProfesor,
            apellidopProfesor: apellidopProfesor,
            apellidomProfesor: apellidomProfesor,
            telefonoProfesor: telefonoProfesor,
            matriculaProfesor: matriculaProfesor,
            correoInstitucional: correoInstitucional,
            correoPersonal: correoPersonal,
            contraseña: hashPassword,
            rfcProfesor: rfcProfesor,
            estado: estado
        });
        res.status(201).json({msg: "Profesor Creado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const updateProfesor = async(req, res) => {
    const profesor = await Profesor.findOne({
        where:{
            idProfesor: req.params.id
        }
    });
    if(!profesor) return res.status(404).json({msg: "Profesor No Actualizado"});
    const{nombreProfesor, apellidopProfesor, apellidomProfesor, telefonoProfesor, correoPersonal, matriculaProfesor, correoInstitucional, contraseña, confcontraseña, estado, rfcProfesor} = req.body;
    let hashPassword;
    if(contraseña === "" || contraseña === null){
        hashPassword = profesor.contraseña
    }else{
        hashPassword = await argon2.hash(contraseña);
    }
    if(contraseña !== confcontraseña) return res.status(400).json({msg: "Password Incorrecta"});
    try{
        await Profesor.update({
            nombreProfesor: nombreProfesor,
            apellidopProfesor: apellidopProfesor,
            apellidomProfesor: apellidomProfesor,
            telefonoProfesor: telefonoProfesor,
            matriculaProfesor: matriculaProfesor,
            correoInstitucional: correoInstitucional,
            correoPersonal: correoPersonal,
            contraseña: hashPassword,
            rfcProfesor: rfcProfesor,
            estado: estado
        },{
            where: {
                id: profesor.id
            }
        }
        );
        res.status(200).json({msg: "Profesor Actualizada"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }

}

export const deleteProfesor = async(req, res) => {
    const profesor = await Profesor.findOne({
        where:{
            idProfesor: req.params.id
        }
    });
    if(!profesor) return res.status(404).json({msg: "Profesor no Eliminado"});
    try{
        await Profesor.destroy({
            where: {
                id: profesor.id
            }
        }
        );
        res.status(200).json({msg: "Profesor Borrado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }

}