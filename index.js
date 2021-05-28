const express = require("express");
const app = express();
const WebSocket = require("ws");

const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const port = 3000;
const wsPort = 5000;

const Login = require("./routes/login");
const Device = require("./routes/device");
const store = require("./store");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use("/login", Login);
app.use("/device", Device);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port} ws at ws://localhost:${wsPort}`
  );
});

const wss = new WebSocket.Server({ port: wsPort });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    const { key, value } = JSON.parse(message);
    if (key === "setEmail") {
      store.setConnection(value, ws);
    }
  });
  ws.send("something");
});
