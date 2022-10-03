import Area from "../models/AreaModel.js";
import argon2 from "argon2";

export const getArea = async(req, res) => {
    try{
        const response = await Area.findAll({
            attributes: ['idArea','nombreArea'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getAreaById = async(req, res) => {
    try{
        const response = await Area.findOne({
            attributes: ['idArea','nombreArea'],
            where:{
                idArea: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createArea = async(req, res) => {
    const{nombreArea} = req.body;
    try{
        await Area.create({
            nombreArea: nombreArea
        });
        res.status(201).json({msg: "Registro Completo"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const updateArea = async(req, res) => {
    const area = await Area.findOne({
        where:{
            idArea: req.params.id
        }
    });
    if(!area) return res.status(404).json({msg: "Area No Actualizada"});
    const{nombreArea} = req.body;
    try{
        await Area.update({
            nombreArea: nombreArea
        },
        {
            where: {
                id: area.id
            }
        });
        res.status(201).json({msg: "Area Actualizada"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const deleteArea = async (req, res) => {
    const area = await Area.findOne({
        where:{
            idArea: req.params.id
        }
    });
    if(!area) return res.status(404).json({msg: "Area No Borrada"});
    try{
        await Area.destroy(
        {
            where: {
                id: area.id
            }
        });
        res.status(201).json({msg: "Area Borrada"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}