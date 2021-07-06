// const express = require("express");
// const path = require("path");
// const WebSocket = require("ws");
import express from "express";
import path from "path";
import WebSocket from "ws";

const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 4030;

// const Login = require("./routes/login");
import Login from "./routes/login";
// const Device = require("./routes/device");
// const Chat = require("./routes/chat");
// const Contact = require("./routes/contact");
// const Media = require("./routes/media");
// const UploadFile = require("./routes/upload");
// const { onMessageHandler } = require("./socket/onMessage");
import { onMessageHandler } from "./socket/onMessage";
import { onCloseHandler } from "./socket/onClose";
// const { onCloseHandler } = require("./socket/onClose");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("client"));

app.use("/login", Login);
// app.use("/device", Device);
// app.use("/chat", Chat);
// app.use("/contact", Contact);
// app.use("/media", Media);
// app.use("/uploadFile", UploadFile);

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
