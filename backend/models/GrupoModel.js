import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const {DataTypes} = Sequelize;

const Grupo = db.define('grupo', {
    idGrupo:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nombreGrupo:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    Carrera_idCarrera:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    Carrera_Area_idArea:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    Grado_idGrado:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
    
}, {
    freezeTableName: true
});

export default Grupo;