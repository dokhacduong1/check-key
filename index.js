const express = require("express");
var bodyParser = require('body-parser')
var cors = require('cors')
const routesV1 = require("./api/v1/routes/index.routes");
//Import cấu hình file .env
require("dotenv").config();
const app = express();
app.use(cors())
app.use(bodyParser.json())
routesV1(app);

const port = process.env.PORT;

//Tạo ra trang 404
app.get("*", (req, res) => {
    res.status(404).json({error:"Api not found"});
});


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
