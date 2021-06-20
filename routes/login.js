const express = require("express");
const router = express.Router();

const store = require("../store/index");

const {
  AuthApiClient,
  TalkClient,
  TalkChatData,
  // KnownAuthStatusCode,
} = require("node-kakao");
const { getAllMessages } = require("../helpers/chat");

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
  const { email, password, deviceName, deviceId, lastMessageTimeStamp } =
    req.body;
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
    let largestTimeStamp = lastMessageTimeStamp;
    for (const item of allList) {
      const { displayUserList, lastChatLogId } = item.info;
      const { nickname, userId } = displayUserList[0];
      const currentUserId = parseInt(userId);
      messages[nickname] = {
        userId: currentUserId,
        messages: [],
      };
      const { newMessages, latestTimeStamp } = await getAllMessages(
        item,
        lastChatLogId,
        0,
        client.clientUser.userId,
        email,
        nickname,
        lastMessageTimeStamp
      );
      chatList[nickname] = {
        ...item.info,
        messages: newMessages,
        intId: currentUserId,
      };
      storeChatList[nickname] = item;
      console.log("latestTimeStamp: ", latestTimeStamp);
      if (latestTimeStamp > largestTimeStamp) {
        largestTimeStamp = latestTimeStamp;
      }
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
        largestTimeStamp,
      });
      store.addChatList(email, storeChatList);
      client.on("chat", (data, channel) => {
        const sender = data.getSenderInfo(channel);
        if (!sender) {
          return;
        } else {
          const {
            _chat: {
              text,
              sendAt,
              attachment,
              sender: { userId },
            },
          } = data;
          const senderIntUserId = parseInt(userId);
          const info = channel.getAllUserInfo();
          console.log(sendAt);
          let receiverUser = {};
          let senderUser = {};
          try {
            for (const item of info) {
              const { userId } = item;
              const currentUserIntId = parseInt(userId);
              if (senderIntUserId === currentUserIntId) {
                senderUser = item;
                senderUser.intId = currentUserIntId;
              } else {
                receiverUser = item;
                receiverUser.intId = parseInt(userId);
              }
            }
          } catch (error) {
            console.error(error);
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
      res.json({
        error: response,
        message: "Failed to login in Kakao talk",
      });
    }
  }
});

//export this router to use in our server.js
module.exports = router;
