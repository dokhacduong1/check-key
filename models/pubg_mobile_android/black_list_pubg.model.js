// CREATE TABLE black_list (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     hwid VARCHAR(255) NOT NULL,
//     createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     INDEX idx_hwid (hwid)
// );

const DataTypes = require('sequelize').DataTypes;
const sequelize = require('../../configs/database_pubg.config');
const BlackList = sequelize.define(
    "black_list",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        hwid: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "black_list",
        timestamps: true,
    }
);

module.exports = BlackList;