const pubgRoutes = require("./pubg.routes");
module.exports = (app) => {
    const version = "/api/v1";
    app.use(`${version}/pubg`, pubgRoutes);
};