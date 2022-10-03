import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const {DataTypes} = Sequelize;

const Materia = db.define('materia', {
    idMateria:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nombreMateria:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    Grado_idGrado:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    Grado_ModeloEstudio_idModeloEstudio:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default Materia;