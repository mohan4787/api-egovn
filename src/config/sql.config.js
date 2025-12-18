// src/config/sequelize.config.js
const { Sequelize } = require("sequelize");
const { sqlConfig } = require("./config"); // make sure this has db, user, password, host, dialect

// ✅ Create the Sequelize instance
const sequelize = new Sequelize(
    sqlConfig.db,
    sqlConfig.user,
    sqlConfig.password,
    {
        host: sqlConfig.host,
        dialect: sqlConfig.dialect,
        port: sqlConfig.port || 5432,
        logging: false, // optional: disable SQL logging
    }
);

// ✅ Function to test connection
const authenticateSql = async () => {
    try {
        await sequelize.authenticate(); // <- use the instance, not Sequelize class
        console.log("Database connected successfully");
    } catch (exception) {
        console.error("Database connection failed:", exception);
        throw exception;
    }
};

module.exports = {
    sequelize,       // <- export the instance
    authenticateSql
};
