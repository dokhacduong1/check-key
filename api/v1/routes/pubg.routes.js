const express = require('express');
//Xíu phải tạo file Control mới có file controller này
const controller = require("../controllers/pubg.controller")
const validate = require("../validates/pubg.validate")
const middleware = require("../middlewares/pubg.middleware")
const router = express.Router();
router.get('/check-key',validate.checkKey,controller.checkKey )
router.get('/authen/me',validate.handleAuthenKey,middleware.handleAuthenKey,controller.handleAuthenKey )
router.post('/banner',validate.banner,controller.bannerKey )
module.exports =router