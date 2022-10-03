import Carrera from "../models/CarreraModel.js";
import argon2 from "argon2";

export const getCarrera = async(req, res) => {
    try{
        const response = await Carrera.findAll({
            attributes: ['idCarrera','nombreCarrera','Area_idArea'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getCarreraById = async(req, res) => {
    try{
        const response = await Carrera.findOne({
            attributes: ['idCarrera','nombreCarrera','Area_idArea'],
            where:{
                idCarrera: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getCarreraByArea = async(req, res) => {
    try{
        const response = await Carrera.findOne({
            attributes: ['idCarrera','nombreCarrera','Area_idArea'],
            where:{
                idArea: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createCarrera = async(req, res) => {
    const{nombreCarrera, Area_idArea} = req.body;
    try{
        await Carrera.create({
            nombreCarrera: nombreCarrera,
            Area_idArea: Area_idArea
        });
        res.status(201).json({msg: "Registro Completo"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const updateCarrera = async(req, res) => {
    const carrera = await Carrera.findOne({
        where:{
            idCarrera: req.params.id
        }
    });
    if(!carrera) return res.status(404).json({msg: "Carrera No Actualizada"});
    const{nombreCarrera, Area_idArea} = req.body;
    let areaidCarrera;
    if(Area_idArea === "" || Area_idArea === null){
        areaidCarrera = carrera.Area_idArea
    }else{
        areaidCarrera = await Area_idArea;
    }
    try{
        await Carrera.update({
            nombreCarrera: nombreCarrera,
            Area_idArea: areaidCarrera
        },
        {
            where: {
                id: carrera.id
            }
        });
        res.status(201).json({msg: "Carrera Actualizada"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const deleteCarrera = async(req, res) => {
    const carrera = await Carrera.findOne({
        where:{
            idCarrera: req.params.id
        }
    });
    if(!carrera) return res.status(404).json({msg: "Area No Borrada"});
    try{
        await Carrera.destroy(
        {
            where: {
                id: carrera.id
            }
        });
        res.status(201).json({msg: "Carrera Borrada"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}