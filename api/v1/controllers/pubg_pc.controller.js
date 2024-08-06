
const ListKey = require("../../../models/pubg_mobile_pc/list_key_pubg.model.js");
const BlackList = require("../../../models/pubg_mobile_pc/black_list_pubg.model.js");
const jwt = require("jsonwebtoken");

const generateToken = (data) => {
    if(data?.id) delete data.id;

    return jwt.sign(data, process.env.SECRET_KEY, { expiresIn: 60 * 60 * 24 * 1 });
};

const updateKey = async (hwid_c, expiryTime, id) => {
    await ListKey.update({ hwid: hwid_c, expires_at: expiryTime, status: "active" }, { where: { id: id } });
    return await ListKey.findOne({ where: { id: id }, raw: true, attributes: ['key', 'type_key', 'expires_at', 'hwid', 'status'] });
}

const getKeyData = async (key) => {
    return await ListKey.findOne({
        where: { key: key },
        raw: true,
        attributes: ['id', 'key', 'type_key', 'expires_at', 'hwid', 'status']
    });
}

const checkKeyStatus = async (status, hwid, hwid_c, expires_at, id,data=[],version="") => {
    if (status === "banner") return { status: 400, message: "Key is banner" };
    if (status === "active") {
        if (hwid === hwid_c) {
            if (new Date(expires_at) < new Date()){
                await ListKey.destroy({ where: { id: id } });
                return { status: 400, message: "Key is expired" };
            }
         
            const token = generateToken(data);
            
            return { status: 200, message: "Key is valid", token: token,version:version };
        } else {
            return { status: 401, message: "Key is active on another device" };
        }
    }
    return null;
}

module.exports.checkKey = async function (req, res) {
    try {
        const version = req["version"];
        const { key, hwid_c } = req.body;
        const data = await getKeyData(key);

        if (!data) return res.status(400).json({ status: 400, message: "Key is invalid" });

        const { id, type_key, expires_at, hwid, status } = data;
        let token = "";

        const keyStatus = await checkKeyStatus(status, hwid, hwid_c, expires_at, id,data,version);
        if (keyStatus) return res.status(keyStatus.status).json(keyStatus);

        if (type_key === "free") {
            token = generateToken(data);
            return res.status(200).json({ status: 200, message: "Key is free valid", token: token,version:version });
        }

        const dayValid = parseInt(type_key.split("_")[0]) ?? 1;
        const currentTime = new Date();
        const expiryTime = new Date(currentTime);
        expiryTime.setDate(currentTime.getDate() + dayValid); 
        const updatedData = await updateKey(hwid_c, expiryTime, id);

        token = generateToken(updatedData);
        res.status(200).json({ status: 200, message: "Key is valid", token: token,version:version });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports.handleAuthenKey = async function (req, res) {
  res.status(200).json({ status: 200, message: "Key is valid" });
}

module.exports.bannerKey = async function (req, res) {
    const { hwid } = req.body;
    await BlackList.create({ hwid: hwid });
    res.status(200).json({ status: 200, message: "Banner" });
}