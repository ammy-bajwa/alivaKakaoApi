const express = require("express");
const router = express.Router();

const store = require("../store/index");

const {
  AuthApiClient,
  TalkClient,
  TalkChatData,
  // KnownAuthStatusCode,
} = require("node-kakao");

// router.post("/token", async (req, res) => {
//   console.log("req.body: ", req.body);
//   const { email, password, deviceName, deviceId } = req.body;
//   const authApi = await AuthApiClient.create(deviceName, deviceId);
//   store.setAuthApi(authApi);
//   const loginRes = await authApi.loginToken({
//     email,
//     password, // This option force login even other devices are logon
//     forced: true,
//   });
//   console.log("loginRes: ", loginRes, KnownAuthStatusCode);
//   res.send("ok");
// });

router.post("/", async (req, res) => {
  const { email, password, deviceName, deviceId } = req.body;
  const authApi = await AuthApiClient.create(deviceName, deviceId);
  store.setAuthApi(authApi);
  const loginRes = await authApi.login({
    email,
    password,
    // This option force login even other devices are logon
    forced: true,
  });

  if (!loginRes.success) {
    console.log(loginRes);
    res.json({
      error: loginRes.status,
      message: "Failed to login",
    });
  } else {
    console.log(`Received access token: ${loginRes.result.accessToken}`);
    const client = new TalkClient();
    const response = await client.login(loginRes.result);
    const allList = client.channelList.all();
    let chatList = {};
    let messages = {};
    let storeChatList = {};
    const messageStore = [];
    const loggedInUserId = parseInt(response.result.userId);
    for (const item of allList) {
      const allChat = (await item.getChatListFrom()).result;
      const { displayUserList } = item.info;
      const { nickname, userId } = displayUserList[0];
      const currentUserId = parseInt(userId);
      messages[nickname] = {
        userId: currentUserId,
        messages: [],
      };
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
        messageStore.push(msgObj);
        messages[nickname].messages.push(msgObj);
      }
      chatList[nickname] = { ...item.info, messages: [], intId: currentUserId };
      storeChatList[nickname] = item;
    }
    if (response.success) {
      store.setClient(email, client);
      res.json({
        email,
        loggedInUserId,
        accessToken: loginRes.result.accessToken,
        refreshToken: loginRes.result.refreshToken,
        chatList,
        messageStore,
        messages,
      });
      store.addChatList(email, storeChatList);
      client.on("chat", (data, channel) => {
        console.log("chat triggered");
        const sender = data.getSenderInfo(channel);
        if (!sender) return;
        if (data.text === "self") {
          channel.sendChat("Hello from amir");
        } else {
          const { text } = data;
          const attachment = data.attachment();
          const info = channel.getAllUserInfo();
          const messageReeciveTime = new Date().getTime();
          const receiverUser = {};
          for (const item of info) {
            const { nickname } = item;
            if (nickname !== sender.nickname) {
              receiverUser[nickname] = item;
            }
          }
          const messageData = {
            key: "newMesssage",
            text,
            sender,
            attachment,
            receiverUser,
            sendAt: messageReeciveTime,
          };
          const ws = store.getConnection(email);
          ws.send(JSON.stringify(messageData));
        }
      });
    } else {
      console.log(response);
      res.json({
        error: response,
        message: "Failed to login in Kakao talk",
      });
    }
  }
});

//export this router to use in our server.js
module.exports = router;
