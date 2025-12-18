const { DataTypes } = require("sequelize");
const { sequelize } = require("../../config/sql.config"); // ✅ Destructure the instance

const BannerModel = sequelize.define("Banners", {
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
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // ✅ Correct default for Sequelize
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW, // ✅ Correct default for Sequelize
  },
}, {
  tableName: "banners",
  timestamps: true,
});

module.exports = BannerModel;
