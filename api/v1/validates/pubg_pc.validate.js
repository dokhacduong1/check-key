const BlackList = require("../../../models/pubg_mobile_pc/black_list_pubg.model.js");
module.exports.checkKey = async (req, res, next) => {

    const { key, hwid_c } = req.body;
    if (!key) {
        return res.status(400).json({status: 400, message: "Key is required" });
    }
    if (!hwid_c) {
        return res.status(400).json({status: 400, message: "Hwid is required" });
    }
    const checkBlackList = await BlackList.findOne({ where: { hwid: hwid_c }, raw: true });
    if (checkBlackList) return res.status(403).json({ status:403,message: "Device is banner" });
    next();
}



module.exports.handleAuthenKey = (req, res, next) => {
    const { token } = req.body;
    if (!token) return res.status(400).json({ status: 400, message: "Token is required" });
    next();
}


module.exports.banner = async (req, res, next) => {
    const { hwid } = req.body;
    if (!hwid) return res.status(400).json({ message: "Hwid is required" });
    const checkBlackList = await BlackList.findOne({ where: { hwid: hwid },raw: true });
    if (checkBlackList) return res.status(400).json({ message: "Hwid is blacklisted" });
    next();
}
