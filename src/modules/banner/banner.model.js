const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sql.config");

const BannerModel = sequelize.define(
  "banners", // table name in lowercase
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "inactive",
    },
    image: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "banners",
    timestamps: true,
    underscored: true, // created_at, updated_at in DB
  }
);

module.exports = BannerModel;
