const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const port = 3000;

const Login = require("./routes/login");
const Device = require("./routes/device");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/login", Login);
app.use("/device", Device);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
