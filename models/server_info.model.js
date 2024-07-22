// CREATE TABLE server_info (
//     id INT NOT NULL DEFAULT 1,
//     version VARCHAR(50),
//     server_status ENUM('inactive', 'active') NOT NULL,
//     PRIMARY KEY (id)
// );


const DataTypes = require('sequelize').DataTypes;
const sequelize = require('../configs/database_pubg.config');

const ServerInfo = sequelize.define(
  "server_info",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    server_status: {
      type: DataTypes.ENUM('inactive', 'active'),
      allowNull: false,
    },
  },
  {
    tableName: "server_info",
  }
);

module.exports = ServerInfo;