const ServerInfo = require("../../../models/server_info.model");

module.exports.serverStatus = async (req, res, next) => {
    const server_info = await ServerInfo.findOne({
        where: {
            id: 1
        },
        raw: true
    });

    if (!server_info || server_info.server_status === "inactive") {
        const status = !server_info ? 400 : 503;
        return res.status(status).json({ status, message: "Server is inactive" });
    }

    next();
}