import { Sequelize } from "sequelize";

const db = new Sequelize('db_utn', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;