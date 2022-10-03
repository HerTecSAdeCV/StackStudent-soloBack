import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const {DataTypes} = Sequelize;

const Carrera = db.define('carrera', {
    idCarrera:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nombreCarrera:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    Area_idArea:{
        type:DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default Carrera;