import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const {DataTypes} = Sequelize;

const ModeloEstudio = db.define('modeloEstudio', {
    idModeloEstudio:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nombreModeloEstudio:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    periodoModeloEstudio:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    }
}, {
    freezeTableName: true
});

export default ModeloEstudio;