import ModeloEstudio from "../models/MestudioModel.js";

export const getModeloEstudio = async (req, res) => {
    try{
        const response = await ModeloEstudio.findAll({
            attributes: ['idModeloEstudio', 'nombreModeloEstudio', 'periodoModeloEstudio'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getModeloEstudioById = async (req, res) => {
    try{
        const response = await ModeloEstudio.findOne({
            attributes: ['idModeloEstudio', 'nombreModeloEstudio', 'periodoModeloEstudio'],
            where:{
                idModeloEstudio: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createModeloEstudio = async (req, res) => {
    const{nombreModeloEstudio, periodoModeloEstudio} = req.body;
    try{
        await ModeloEstudio.create({
            nombreModeloEstudio: nombreModeloEstudio,
            periodoModeloEstudio:periodoModeloEstudio
        });
        res.status(201).json({msg: "Registro Completo"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const updateModeloEstudio = async (req, res) => {
    const modeloEstudio = await ModeloEstudio.findOne({
        where:{
            idModeloEstudio: req.params.id
        }
    });
    if(!modeloEstudio) return res.status(404).json({msg: "Modelo de Estudio No Actualizado"});
    const{nombreModeloEstudio, periodoModeloEstudio} = req.body;
    try{
        await ModeloEstudio.update({
            nombreModeloEstudio: nombreModeloEstudio,
            periodoModeloEstudio:periodoModeloEstudio
        },
        {
            where: {
                id: modeloEstudio.id
            }
        });
        res.status(201).json({msg: "Modelo de Estudio Actualizado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const deleteModeloEstudio = async (req, res) => {
    const modeloEstudio = await ModeloEstudio.findOne({
        where:{
            idModeloEstudio: req.params.id
        }
    });
    if(!modeloEstudio) return res.status(404).json({msg: "Modelo de Estudio No Borrado"});
    try{
        await ModeloEstudio.destroy(
        {
            where: {
                id: modeloEstudio.id
            }
        });
        res.status(201).json({msg: "Modelo de Estudio Borrado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}