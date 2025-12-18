
const { sqlConfig } = require("../src/config/config");

module.exports = {
  development: {
    username: sqlConfig.user,
    password: sqlConfig.password,
    database: sqlConfig.db,
    host: sqlConfig.host,
    dialect: sqlConfig.dialect,
    port: sqlConfig.port || 5432
  },
  test: {
    username: sqlConfig.user,
    password: sqlConfig.password,
    database: sqlConfig.db,
    host: sqlConfig.host,
    dialect: sqlConfig.dialect,
    port: sqlConfig.port || 5432
  },
  production: {
    username: sqlConfig.user,
    password: sqlConfig.password,
    database: sqlConfig.db,
    host: sqlConfig.host,
    dialect: sqlConfig.dialect,
    port: sqlConfig.port || 5432
  }
};
