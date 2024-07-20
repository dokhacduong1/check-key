const jwt = require("jsonwebtoken");
module.exports.handleAuthenKey = async (req, res, next) => {

    const { token } = req.body;
    const data = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (error, data) => {
            if (error) return resolve({ status: false, message: "Token is invalid" });
            resolve({ status: true, data: data });
        });
    });

    if (!data.status) return res.status(400).json({ status: 400, message: "Token is invalid" });
    if (data.data.type_key === "free") return res.status(200).json({ status: 200, message: "Key is free valid" });
    if (new Date(data.data.expires_at) < new Date()) return res.status(400).json({ status: 400, message: "Token is expired" });
    next();


}
