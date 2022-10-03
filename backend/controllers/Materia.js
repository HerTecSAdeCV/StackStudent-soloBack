import Materia from "../models/MateriaModel.js";

export const getMateria = async (req, res) => {
    try{
        const response = await Materia.findAll({
            attributes: ['idMateria','nombreMateria','Grado_idGrado','Grado_ModeloEstudio_idModeloEstudio'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getMateriaById = async (req, res) => {
    try{
        const response = await Materia.findOne({
            attributes: ['idMateria','nombreMateria','Grado_idGrado','Grado_ModeloEstudio_idModeloEstudio'],
            where:{
                idMateria: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createMateria = async (req, res) => {
    const{nombreMateria, Grado_idGrado, Grado_ModeloEstudio_idModeloEstudio} = req.body;
    try{
        await Materia.create({
            nombreMateria: nombreMateria,
            Grado_idGrado:Grado_idGrado,
            Grado_ModeloEstudio_idModeloEstudio: Grado_ModeloEstudio_idModeloEstudio
        });
        res.status(201).json({msg: "Registro Completo"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const updateMateria = async (req, res) => {
    const materia = await Materia.findOne({
        where:{
            idMateria: req.params.id
        }
    });
    if(!materia) return res.status(404).json({msg: "Materia No Actualizado"});
    const{nombreMateria, Grado_idGrado, Grado_ModeloEstudio_idModeloEstudio} = req.body;
    let idModeloEstudio;
    let idGrado;
    if(idModeloEstudio === "" || idModeloEstudio === null && Grado_idGrado === "" || Grado_idGrado === null){
        idModeloEstudio = materia.Grado_ModeloEstudio_idModeloEstudio;
        idGrado = materia.Grado_idGrado;
    }else{
        idModeloEstudio = await Grado_ModeloEstudio_idModeloEstudio;
        idGrado = await Grado_idGrado;
    }
    try{
        await Materia.update({
            nombreMateria: nombreMateria,
            Grado_idGrado:idGrado,
            Grado_ModeloEstudio_idModeloEstudio: idModeloEstudio
        },
        {
            where: {
                id: materia.id
            }
        });
        res.status(201).json({msg: "Materia Actualizado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const deleteMateria = async (req, res) => {
    const materia = await Materia.findOne({
        where:{
            idMateria: req.params.id
        }
    });
    if(!materia) return res.status(404).json({msg: "Materia No Borrado"});
    try{
        await Materia.destroy(
        {
            where: {
                id: materia.id
            }
        });
        res.status(201).json({msg: "Materia Borrado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}