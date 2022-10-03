import Grado from "../models/GradoModel.js";

export const getGrado = async(req, res) => {
    try{
        const response = await Grado.findAll({
            attributes: ['idGrado','nombreGrado','ModeloEstudio_idModeloEstudio'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getGradoById = async(req, res) => {
    try{
        const response = await Grado.findOne({
            attributes: ['idGrado','nombreGrado','ModeloEstudio_idModeloEstudio'],
            where:{
                idGrado: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createGrado = async(req, res) => {
    const{nombreGrado, ModeloEstudio_idModeloEstudio} = req.body;
    try{
        await Grado.create({
            nombreGrado: nombreGrado,
            ModeloEstudio_idModeloEstudio: ModeloEstudio_idModeloEstudio
        });
        res.status(201).json({msg: "Registro Completo"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const updateGrado = async(req, res) => {
    const grado = await Grado.findOne({
        where:{
            idGrado: req.params.id
        }
    });
    if(!grado) return res.status(404).json({msg: "Grado No Actualizado"});
    const{nombreGrado, ModeloEstudio_idModeloEstudio} = req.body;
    let mEidMe;
    if(ModeloEstudio_idModeloEstudio === "" || ModeloEstudio_idModeloEstudio === null){
        mEidMe = grado.ModeloEstudio_idModeloEstudio
    }else{
        mEidMe = await ModeloEstudio_idModeloEstudio;
    }
    try{
        await Grado.update({
            nombreGrado: nombreGrado,
            ModeloEstudio_idModeloEstudio: mEidMe
        },
        {
            where: {
                id: grado.id
            }
        });
        res.status(201).json({msg: "Grado Actualizado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const deleteGrado = async(req, res) => {
    const grado = await Grado.findOne({
        where:{
            idGrado: req.params.id
        }
    });
    if(!grado) return res.status(404).json({msg: "Grado No Borrado"});
    try{
        await Grado.destroy(
        {
            where: {
                id: grado.id
            }
        });
        res.status(201).json({msg: "Grado Borrado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}