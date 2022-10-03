import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const {DataTypes} = Sequelize;

const Profesor = db.define('profesor', {
    idProfesor:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nombreProfesor:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    apellidopProfesor:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    apellidomProfesor:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    matriculaProfesor:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    correoInstitucional:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    contraseña:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    estado:{
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue: "Activo",
        validate:{
            notEmpty: true
        }
    },
    rol:{
        type:DataTypes.STRING,
        allowNull: false,
        defaultValue: "Profesor",
        validate:{
            notEmpty: true
        }
    }
}, {
    freezeTableName: true
});

export default Profesor;