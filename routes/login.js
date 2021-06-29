const express = require("express");
const router = express.Router();

const store = require("../store/index");

const {
  AuthApiClient,
  TalkClient,
  KnownAuthStatusCode,
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
  const {
    email,
    password,
    deviceName,
    deviceId,
    lastMessageTimeStamp,
    latestLogId,
  } = req.body;
  let authApi, loginRes;

  try {
    let client;
    let response;

    authApi = await AuthApiClient.create(deviceName, deviceId);
    loginRes = await authApi.login({
      email,
      password,
      // This option force login even other devices are logon
      forced: true,
    });
    if (!loginRes.success) {
      console.log("loginRes: ", loginRes);
      res.json({
        error: loginRes.status,
        message: "Failed to login",
      });
    }
    store.setAuthApi(authApi);
    client = new TalkClient();
    response = await client.login({
      accessToken: loginRes.result.accessToken,
      refreshToken: loginRes.result.refreshToken,
      deviceUUID: loginRes.result.deviceUUID,
    });

    for (let index = 0; index < 15; index++) {
      response = await client.login({
        accessToken: loginRes.result.accessToken,
        refreshToken: loginRes.result.refreshToken,
        deviceUUID: loginRes.result.deviceUUID,
      });
      if (response.success) {
        break;
      } else {
        console.log(response.success);
      }
    }
    const allList = client.channelList.all();
    let chatList = {};
    let messages = {};
    let storeChatList = {};
    const messageStore = [];
    const loggedInUserId = parseInt(response.result.userId);
    let largestTimeStamp = lastMessageTimeStamp;
    let biggestChatLog = latestLogId;
    try {
      for (const item of allList) {
        const { displayUserList, lastChatLogId, newChatCount } = item.info;
        const { nickname, userId } = displayUserList[0];
        const currentUserId = parseInt(userId);
        messages[nickname] = {
          userId: currentUserId,
          messages: [],
        };
        let itemChat = [];
        if (parseInt(lastChatLogId) > latestLogId) {
          const { newMessages, latestTimeStamp } = await getAllMessages(
            item,
            lastChatLogId,
            latestLogId,
            client.clientUser.userId,
            email,
            nickname,
            lastMessageTimeStamp
          );
          itemChat = newMessages;
          if (latestTimeStamp > largestTimeStamp) {
            largestTimeStamp = latestTimeStamp;
          }
          if (parseInt(lastChatLogId) > biggestChatLog) {
            biggestChatLog = parseInt(lastChatLogId);
          }
        }
        chatList[nickname] = {
          ...item.info,
          messages: itemChat,
          intId: currentUserId,
          newChatCount,
          lastChatLogId: parseInt(lastChatLogId),
        };
        storeChatList[nickname] = item;
      }
    } catch (error) {
      console.error(error);
    }
    if (response.success) {
      store.setClient(email, client);
      console.log(`Login Success`);
      res.json({
        email,
        loggedInUserId,
        accessToken: loginRes.result.accessToken,
        refreshToken: loginRes.result.refreshToken,
        chatList,
        messageStore,
        messages,
        largestTimeStamp,
        biggestChatLog,
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
              logId,
              sender: { userId },
            },
          } = data;
          const senderIntUserId = parseInt(userId);
          const info = channel.getAllUserInfo();
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
            logId: parseInt(logId),
            attachment,
            receiverUser,
            sendAt,
          };
          const ws = store.getConnection(email);
          ws.send(JSON.stringify(messageData));
        }
      });
    } else {
      console.error("Client login failed: ", response);
      res.json({
        error: response,
        message: "Failed to login in Kakao talk",
      });
    }
  } catch (error) {
    console.error(error);
  }
});

//export this router to use in our server.js
module.exports = router;
