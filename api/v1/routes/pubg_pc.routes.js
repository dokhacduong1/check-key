const express = require('express');
//Xíu phải tạo file Control mới có file controller này
const controller = require("../controllers/pubg_pc.controller")
const validate = require("../validates/pubg_pc.validate")
const middleware = require("../middlewares/pubg.middleware")
const middleware_status_server = require("../middlewares/status_server_pubg_pc.middleware");
const router = express.Router();
router.get('/check-key',middleware_status_server.serverStatus,validate.checkKey,controller.checkKey )
router.get('/authen/me',middleware_status_server.serverStatus,validate.handleAuthenKey,middleware.handleAuthenKey,controller.handleAuthenKey )
router.post('/banner',middleware_status_server.serverStatus,validate.banner,controller.bannerKey )
module.exports =router