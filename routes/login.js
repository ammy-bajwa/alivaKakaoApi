const express = require("express");
const router = express.Router();

const store = require("../store/index");

const { AuthApiClient, TalkClient, TalkChatData } = require("node-kakao");

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
    const clientChat = new TalkChatData();
    const response = await client.login(loginRes.result);
    const allList = client.channelList.all();
    let chatList = {};
    let storeChatList = {};
    const messageStore = [];
    console.log(clientChat);
    for (const item of allList) {
      const allChat = (await item.getChatListFrom()).result;
      const { displayUserList } = item.info;
      const { nickname } = displayUserList[0];
      for (const message of allChat) {
        const isMeSender =
          parseInt(message.sender.userId) ===
          parseInt(client.clientUser.userId);
        messageStore.push({
          text: message.text,
          receiverUserName: isMeSender ? nickname : email,
          attachment: message.attachment,
          received: true,
          senderName: isMeSender ? email : nickname,
        });
      }
      chatList[nickname] = { ...item.info, messages: [] };
      storeChatList[nickname] = item;
    }
    if (response.success) {
      store.setClient(email, client);
      res.json({
        email,
        accessToken: loginRes.result.accessToken,
        refreshToken: loginRes.result.refreshToken,
        chatList,
        messageStore,
      });
      store.addChatList(email, storeChatList);
      client.on("chat", (data, channel) => {
        console.log("chat triggered");
        const sender = data.getSenderInfo(channel);
        if (!sender) return;
        if (data.text === "self") {
          channel.sendChat("Hello from amir");
        } else {
          const { text, sendAt } = data;
          const attachment = data.attachment();
          // const { nickname } = sender;
          const info = channel.getAllUserInfo();
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
            sendAt,
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
