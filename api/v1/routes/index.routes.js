const pubgRoutes = require("./pubg.routes");
const middleware = require("../middlewares/status_server.middleware");
module.exports = (app) => {
    const version = "/api/v1";
    app.use(middleware.serverStatus);
    app.use(`${version}/pubg`, pubgRoutes);
};