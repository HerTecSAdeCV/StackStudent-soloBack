import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const {DataTypes} = Sequelize;

const PersonalAdmin = db.define('personalAdmin', {
    idPersonalAdmin:{
        type:DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    nombre:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    apellidoP:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    apellidoM:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
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
    matricula:{
        type:DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
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
        defaultValue: "AdminArea",
        validate:{
            notEmpty: true
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
    }
}, {
    freezeTableName: true
});

export default PersonalAdmin;