const { mongo } = require('mongoose');

require('dotenv').config();

const AppConfig = {
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
    frontendUrl: process.env.FRONDTEND_URL,
    jwtSecret: process.env.JWT_SECRET
}

const SMTPConfig = {
    provider: process.env.SMTP_PROVIDER,
    host: process.env.SMTP_HOST,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    port: process.env.SMTP_PORT,
    from: process.env.SMTP_FROM,
}

const DbConfig = {
    mongoDBUrl: process.env.MONGODB_URL,
    mongoDBName: process.env.MONGODB_DBNAME
}

const sqlConfig = {
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  db: process.env.SQL_DB,
  dialect: process.env.SQL_DIALECT,
  port: process.env.SQL_PORT
};

module.exports = { sqlConfig };


module.exports = {
    AppConfig,
    SMTPConfig,
    DbConfig,
    sqlConfig
}