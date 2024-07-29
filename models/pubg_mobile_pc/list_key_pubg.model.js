
const DataTypes = require('sequelize').DataTypes;
const sequelize = require('../../configs/database_pubg_pc.config');
// {
//     id: 300737,
//     key: '1_DAY834446DPXSHBAJ',
//     type_key: '1_DAY',
//     time: null,
//     hwid: null,
//     status: 'no-active','active','banner'
//   },
const ListKey = sequelize.define(
  "list_key",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type_key: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    hwid: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "no-active",
    },
  },
  {
    tableName: "list_key",
    timestamps: true,
  }
);

module.exports = ListKey;