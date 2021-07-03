const express = require("express");
const app = express();
const path = require("path");
const WebSocket = require("ws");
const multer = require("multer");

const bodyParser = require("body-parser");
const cors = require("cors");

const port = process.env.PORT || 4030;

const Login = require("./routes/login");
const Device = require("./routes/device");
const Chat = require("./routes/chat");
const Contact = require("./routes/contact");
const Media = require("./routes/media");
const store = require("./store");
const { readFileSync } = require("fs");

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

var upload = multer({ storage: storage });

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static("build"));

app.use("/login", Login);
app.use("/device", Device);
app.use("/chat", Chat);
app.use("/contact", Contact);
app.use("/media", Media);

app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  console.log("Route hit");
  const file = req.file;
  console.log(file);
  res.json({
    success: true,
    fileName: file.originalname,
    path: file.path,
  });
});

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
  ws.on("message", async function incoming(message) {
    // console.log("received: %s", message);
    const { key, value } = JSON.parse(message);
    if (key === "setEmail") {
      store.setConnection(value, ws);
      ws.email = value;
    } else if (key === "newMessage") {
      const { email, message, receiver } = value;
      const client = store.getClient(email);
      const allList = client.channelList.all();
      for (const item of allList) {
        const { displayUserList } = item.info;
        const { nickname, userId } = displayUserList[0];
        if (receiver === nickname) {
          const receiverUser = { intId: parseInt(userId), nickname };
          const {
            result: { text, sendAt, sender, logId },
          } = await item.sendChat(message);
          const newMessage = {
            key: "newMesssage",
            text,
            sender: { intId: parseInt(sender.userId), nickname: email },
            attachment: {},
            logId: parseInt(logId),
            receiverUser,
            sendAt: new Date().getTime(),
          };
          ws.send(JSON.stringify(newMessage));
          console.log("Message sended successfully: ", sendAt);
          break;
        }
      }
    } else if (key === "newMessageFile") {
      const { email, message, receiver, filePath } = value;
      console.log(filePath);
      const client = store.getClient(email);
      const allList = client.channelList.all();
      for (const item of allList) {
        const { displayUserList } = item.info;
        const { nickname, userId } = displayUserList[0];
        if (receiver === nickname) {
          const file = readFileSync(filePath);
          console.log(file);
          const {
            result: { text, sendAt, sender, attachment, logId },
          } = await item.sendMedia(2, {
            data: file,
          });
          const receiverUser = { intId: parseInt(userId), nickname };
          const newMessage = {
            key: "newMesssage",
            text,
            sender: { intId: parseInt(sender.userId), nickname: email },
            attachment,
            logId: parseInt(logId),
            receiverUser,
            sendAt,
          };
          ws.send(JSON.stringify(newMessage));
          console.log("File sended successfully");
          break;
        }
      }
    } else if (key === "isMessageUpdateNeeded") {
      const { time, email, focusedUserId } = value;
      console.log(value);
      const client = store.getClient(email);
      const allList = client.channelList.all();
      let messageStore = [];
      for (const item of allList) {
        const allChat = (await item.getChatListFrom()).result;
        const { displayUserList } = item.info;
        const { nickname, userId } = displayUserList[0];
        const currentUserId = parseInt(userId);
        messageStore = [];
        if (currentUserId === focusedUserId) {
          for (const message of allChat) {
            const isMeSender =
              parseInt(message.sender.userId) ===
              parseInt(client.clientUser.userId);
            const senderName = isMeSender ? email : nickname;
            const msgObj = {
              text: message.text,
              receiverUserName: isMeSender ? nickname : email,
              attachment: message.attachment,
              received: true,
              senderName,
              sendAt: message.sendAt,
            };
            if (message.sendAt > time) {
              messageStore.push(msgObj);
            }
          }
          console.log("New Messages: ", messageStore);
          ws.send(
            JSON.stringify({
              key: "unreadMessages",
              value: {
                userId: focusedUserId,
                messageStore,
              },
            })
          );
          break;
        }
      }
    }
  });
  ws.on("close", () => {
    try {
      const client = store.getClient(ws.email);
      client.close();
      console.log(console.log(`Client closed for ${ws.email}`));
      store.setLastTry(ws.email, null);
    } catch (error) {
      console.log("Already closed: ", error.message);
    }
  });
  ws.send("something");
});
