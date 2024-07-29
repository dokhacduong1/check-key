
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize(
    process.env.DATABASE_NAME_PUBG_PC,
    process.env.DATABASE_USERNAME_PUBG_PC,
    process.env.DATABASE_PASSWORD_PUBG_PC,
    {
        host:  process.env.DATABASE_HOST_PUBG_PC,
        logging: (query, elapsedTime) => {
            console.log(`Query: ${query}`);
            
        },
        dialect: 'mysql'
    }
);
sequelize.authenticate().then(() => {
    
    console.log('Connection success.');
}).catch((error) => {
    console.log(process.env.DATABASE_NAME_PUBG_PC, process.env.DATABASE_USERNAME_PUBG_PC, process.env.DATABASE_PASSWORD_PUBG_PC, process.env.DATABASE_HOST_PUBG_PC);
 
});
module.exports = sequelize;