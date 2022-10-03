import Alumnos from "../models/AlumnoModel.js";
import argon2 from "argon2";

export const getAlumnos = async(req, res) => {
    try{
        const response = await Alumnos.findAll({
            attributes: ['idAlumno', 'nombreAlumno','apellidopAlumno','apellidomAlumno', 'matricula','correoInstitucional','estado', 'Grupo_idGrupo', 'Grupo_Carrera_idCarrera', 'Grupo_Grado_idGrado'],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getAlumnosById = async(req, res) => {
    try{
        const response = await Alumnos.findOne({
            attributes: ['idAlumno', 'nombreAlumno','apellidopAlumno','apellidomAlumno', 'matricula','correoInstitucional','estado', 'Grupo_idGrupo', 'Grupo_Carrera_idCarrera', 'Grupo_Grado_idGrado'],
            where:{
                idAlumno: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createAlumnos = async(req, res) => {
    const{nombreAlumno, nombre2Alumno, apellidopAlumno, apellidomAlumno, genero, fechaNacimiento, correoPersonal, matricula, correoInstitucional, contraseña, confcontraseña, estado, Grupo_idGrupo, Grupo_Carrera_idCarrera, Grupo_Grado_idGrado} = req.body;
    if(contraseña !== confcontraseña) return res.status(400).json({msg: "Password Incorrecta"});
    const hashPassword = await argon2.hash(contraseña);
    try{
        await Alumnos.create({
            nombreAlumno: nombreAlumno,
            nombre2Alumno: nombre2Alumno,
            apellidopAlumno: apellidopAlumno,
            apellidomAlumno: apellidomAlumno,
            genero: genero,
            fechaNacimiento: fechaNacimiento,
            correoPersonal: correoPersonal,
            matricula: matricula,
            correoInstitucional: correoInstitucional,
            contraseña: hashPassword,
            estado: estado,
            Grupo_idGrupo: Grupo_idGrupo,
            Grupo_Carrera_idCarrera:Grupo_Carrera_idCarrera,
            Grupo_Grado_idGrado: Grupo_Grado_idGrado
        });
        res.status(201).json({msg: "Alumno Creado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const updateAlumnos = async(req, res) => {
    const alumno = await Alumnos.findOne({
        where:{
            idAlumno: req.params.id
        }
    });
    if(!alumno) return res.status(404).json({msg: "Alumno No Actualizado"});
    const{nombreAlumno, nombre2Alumno, apellidopAlumno, apellidomAlumno, genero, fechaNacimiento, correoPersonal, matricula, correoInstitucional, contraseña, confcontraseña, estado, Grupo_idGrupo, Grupo_Carrera_idCarrera, Grupo_Grado_idGrado} = req.body;
    let hashPassword;
    let idGrupo;
    let idCarrera;
    let idGrado;
    let estadoA;
    if(contraseña === "" || contraseña === null && Grupo_idGrupo === "" || Grupo_idGrupo === null && Grupo_Carrera_idCarrera === "" || Grupo_Carrera_idCarrera === null && Grupo_Grado_idGrado === "" || Grupo_Grado_idGrado === null && estado === "" || estado === null){
        hashPassword = alumno.contraseña;
        idGrupo = alumno.Grupo_idGrupo;
        idCarrera = alumno.Grupo_Carrera_idCarrera;
        idGrado = alumno.Grupo_Grado_idGrado;
        estadoA = alumno.estado;
    }else{
        hashPassword = await argon2.hash(contraseña);
        idGrupo = await Grupo_idGrupo;
        idCarrera = await Grupo_Carrera_idCarrera;
        idGrado = await Grupo_Grado_idGrado;
        estadoA = await estado;
    }
    if(contraseña !== confcontraseña) return res.status(400).json({msg: "Password Incorrecta"});
    let segundoNombre
    if(nombre2Alumno === ""){
        segundoNombre = alumno.nombre2Alumno;
    }else{
        segundoNombre = await nombre2Alumno;
    }
    if(nombre2Alumno === null){
        segundoNombre = null;
    }
    try{
        await Alumnos.update({
            nombreAlumno: nombreAlumno,
            nombre2Alumno: segundoNombre,
            apellidopAlumno: apellidopAlumno,
            apellidomAlumno: apellidomAlumno,
            genero: genero,
            fechaNacimiento: fechaNacimiento,
            correoPersonal: correoPersonal,
            matricula: matricula,
            correoInstitucional: correoInstitucional,
            contraseña: hashPassword,
            estado: estado,
            Grupo_idGrupo: idGrupo,
            Grupo_Carrera_idCarrera: idCarrera,
            Grupo_Grado_idGrado: idGrado
        },{
            where: {
                id: alumno.id
            }
        }
        );
        res.status(200).json({msg: "Alumno Actualizada"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }

}

export const deleteAlumnos = async(req, res) => {
    const alumno = await Alumnos.findOne({
        where:{
            idAlumno: req.params.id
        }
    });
    if(!alumno) return res.status(404).json({msg: "Alumno no Eliminado"});
    try{
        await Alumnos.destroy({
            where: {
                id: alumno.id
            }
        }
        );
        res.status(200).json({msg: "Alumno Borrado"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }

}