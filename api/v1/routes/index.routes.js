const pubgRoutes = require("./pubg.routes");
const pubgPcRoutes = require("./pubg_pc.routes");
module.exports = (app) => {
    const version = "api/v1";
    app.use(`${version}/pubg`, pubgRoutes);
    app.use(`${version}/pubg-pc`, pubgPcRoutes);
};