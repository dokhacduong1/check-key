
const Sequelize = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();
const sequelize = new Sequelize(
    process.env.DATABASE_NAME_PUBG,
    process.env.DATABASE_USERNAME_PUBG,
    process.env.DATABASE_PASSWORD_PUBG,
    {
        host:  process.env.DATABASE_HOST_PUBG,
        logging: (query, elapsedTime) => {
            console.log(`Query: ${query}`);
            
        },
        dialect: 'mysql'
    }
);
sequelize.authenticate().then(() => {
    console.log('Connection success.');
}).catch((error) => {
    console.log(process.env.DATABASE_NAME_PUBG, process.env.DATABASE_USERNAME_PUBG, process.env.DATABASE_PASSWORD_PUBG, process.env.DATABASE_HOST_PUBG);
 
});
module.exports = sequelize;