const express = require("express");
const app = express();
const path = require("path");
const WebSocket = require("ws");

const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 4030;

const Login = require("./routes/login");
const Device = require("./routes/device");
const store = require("./store");

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("build"));

app.use("/login", Login);
app.use("/device", Device);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
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

// const wss = new WebSocket.Server({ port: wsPort });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    // console.log("received: %s", message);
    const { key, value } = JSON.parse(message);
    if (key === "setEmail") {
      store.setConnection(value, ws);
    } else if (key === "newMessage") {
      const { email, message, receiver, files } = value;
      console.log(files);
      const client = store.getClient(email);
      const allList = client.channelList.all();
      for (const item of allList) {
        const { displayUserList } = item.info;
        const { nickname } = displayUserList[0];
        if (receiver === nickname) {
          if (files) {
            item.sendMedia(-1, {
              data: files,
            });
          } else {
            item.sendChat(message);
          }
          console.log("Message sended successfully");
          break;
        }
      }
    }
  });
  ws.send("something");
});
