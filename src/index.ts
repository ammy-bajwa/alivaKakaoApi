import express from "express";
import path from "path";
import WebSocket from "ws";

const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 4030;

import Login from "./routes/login";
import Chat from "./routes/chat";
import Contact from "./routes/contact";
import Device from "./routes/device";
import Media from "./routes/media";
import UploadFile from "./routes/upload";
import { onMessageHandler } from "./socket/onMessage";
import { onCloseHandler } from "./socket/onClose";

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
  console.log(path.join(__dirname, "../client", "index.html"));
  res.sendFile(path.join(__dirname, "../client", "index.html"));
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
