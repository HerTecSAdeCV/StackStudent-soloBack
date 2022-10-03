import Grupo from "../models/GrupoModel.js";

export const getGrupo = async(req, res) => {
    try{
        const response = await Grupo.findAll({
            attributes: ['idGrupo','nombreGrupo','Carrera_idCarrera','Carrera_Area_idArea','Grado_idGrado'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getGrupoById = async(req, res) => {
    try{
        const response = await Grupo.findOne({
            attributes: ['idGrupo','nombreGrupo','Carrera_idCarrera','Carrera_Area_idArea','Grado_idGrado'],
            where:{
                idGrupo: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createGrupo = async(req, res) => {
    const{nombreGrupo, Carrera_idCarrera,Carrera_Area_idArea,Grado_idGrado} = req.body;
    try{
        await Grupo.create({
            nombreGrupo: nombreGrupo,
            Carrera_idCarrera: Carrera_idCarrera,
            Carrera_Area_idArea: Carrera_Area_idArea,
            Grado_idGrado:Grado_idGrado
        });
        res.status(201).json({msg: "Registro Completo"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const updateGrupo = async(req, res) => {
    const grupo = await Grupo.findOne({
        where:{
            idGrupo: req.params.id
        }
    });
    if(!grupo) return res.status(404).json({msg: "Grupo No Actualizado"});
    const{nombreGrupo, Carrera_idCarrera, Carrera_Area_idArea, Grado_idGrado} = req.body;
    let idCarrera;
    let idArea;
    let idGrado;
    if(Carrera_idCarrera === "" || Carrera_idCarrera === null && Carrera_Area_idArea === "" || Carrera_Area_idArea === null && Grado_idGrado === "" || Grado_idGrado === null){
        idCarrera = grupo.Carrera_idCarrera;
        idArea = grupo.Carrera_Area_idArea;
        idGrado = grupo.Grado_idGrado;
    }else{
        idCarrera = await Carrera_idCarrera;
        idArea = await Carrera_Area_idArea;
        idGrado = await Grado_idGrado;
    }
    try{
        await Grupo.update({
            nombreGrupo: nombreGrupo,
            Carrera_idCarrera: idCarrera,
            Carrera_Area_idArea: idArea,
            Grado_idGrado: idGrado
        },
        {
            where: {
                id: grupo.id
            }
        });
        res.status(201).json({msg: "Grupo Actualizado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const deleteGrupo = async(req, res) => {
    const grupo = await Grupo.findOne({
        where:{
            idGrupo: req.params.id
        }
    });
    if(!grupo) return res.status(404).json({msg: "Grupo No Borrado"});
    try{
        await Grupo.destroy(
        {
            where: {
                id: grupo.id
            }
        });
        res.status(201).json({msg: "Grupo Borrado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}