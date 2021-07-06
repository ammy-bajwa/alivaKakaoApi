const express = require("express");
const app = express();
const path = require("path");
const WebSocket = require("ws");

const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 4030;

const Login = require("./src/routes/login");
const Device = require("./src/routes/device");
const Chat = require("./src/routes/chat");
const Contact = require("./src/routes/contact");
const Media = require("./src/routes/media");
const UploadFile = require("./src/routes/upload");
const { onMessageHandler } = require("./src/socket/onMessage");
const { onCloseHandler } = require("./src/socket/onClose");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("client"));

app.use("/login", Login);
app.use("/device", Device);
app.use("/chat", Chat);
app.use("/contact", Contact);
app.use("/media", Media);
app.use("/uploadFile", UploadFile);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "index.html"));
});

const myServer = app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port} ws at ws://localhost:${port}`
  );
});
const wss = new WebSocket.Server({ noServer: true });

myServer.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});

wss.on("connection", function connection(ws) {
  ws.on("message", (message) => onMessageHandler(ws, message));
  ws.on("close", () => onCloseHandler(ws));
});
