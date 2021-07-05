const express = require("express");
const router = express.Router();

const store = require("../store/index");

const {
  AuthApiClient,
  TalkClient,
  // KnownAuthStatusCode,
  OAuthApiClient,
  // ServiceApiClient,
} = require("node-kakao");
const { getAllMessages } = require("../helpers/chat");
// const { causeDelay } = require("../helpers/delay");
const { lastTryResults } = require("../store/index");

router.post("/logout", async (req, res) => {
  const { email } = req.body;
  const client = store.getClient(email);
  try {
    await client.close();
    console.log(`Client closed for ${email}`);
    res.json({
      success: true,
    });
  } catch (error) {
    res.json({
      success: true,
    });
  }
});

// router.post("/token", async (req, res) => {
//   console.log("req.body: ", req.body);
//   const { accessToken, refreshToken, deviceId, deviceName } = req.body;
//   const authApi = await AuthApiClient.create(deviceName, deviceId);
//   store.setAuthApi(authApi);
//   const loginRes = await authApi.login({
//     deviceUUID: deviceId,
//     accessToken: accessToken,
//     refreshToken: refreshToken,
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
    accessToken,
    refreshToken,
  } = req.body;
  let authApi,
    loginRes,
    client,
    response,
    isTokenLogin = false,
    lastTryResult = store.getLastTry(email);
  const oAuthClient = OAuthApiClient.create();
  try {
    // if (!lastTryResult) {
    // authApi = await AuthApiClient.create(deviceName, deviceId);
    // loginRes = await authApi.login({
    //   email,
    //   password,
    //   forced: true,
    // });
    // loginRes = await (await oAuthClient).renew(loginRes.result);
    // client = new TalkClient();
    // response = await client.login(loginRes.result.credential);
    // store.setLastTry(email, loginRes);
    // console.log("loginRes: ", loginRes);
    // }
    // else {
    //   client = new TalkClient();
    //   const lastTryResult = await (
    //     await oAuthClient
    //   ).renew({
    //     deviceUUID: DEVICE_UUID,
    //     accessToken: ACCESS_TOKEN,
    //     refreshToken: REFRESH_TOKEN,
    //   });
    //   response = await client.login({
    //     accessToken: lastTryResult.result.accessToken,
    //     refreshToken: lastTryResult.result.refreshToken,
    //     deviceUUID: lastTryResult.result.deviceUUID,
    //   });
    // }
    // console.log("response", response);
    authApi = await AuthApiClient.create(deviceName, deviceId);
    loginRes = await authApi.login({
      email,
      password,
      forced: true,
    });
    client = new TalkClient();
    response = await client.login(loginRes.result);
    if (!response.success) {
      loginRes = await (await oAuthClient).renew(loginRes.result);
      client = new TalkClient();
      response = await client.login(loginRes.result.credential);
    }
    if (!response.success) {
      console.log("loginRes: ", loginRes);
      console.log("response: ", response);
      res.json({
        error: response.status,
        message: "Failed to login",
      });
      store.setLastTry(email, loginRes);
    } else {
      if (lastTryResults?.result?.accessToken) {
        loginRes = lastTryResults;
      }
      store.setClient(email, client);
      const allList = client.channelList.all();
      let chatList = {};
      let messages = {};
      let storeChatList = {};
      const messageStore = [];
      const loggedInUserId = parseInt(response.result.userId);
      let largestTimeStamp = lastMessageTimeStamp;
      let biggestChatLog = latestLogId;
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
      store.setClient(email, client);
      console.log(`Login Success: `);
      console.log(`loginRes: `, loginRes);
      console.log(`lastTryResult: `, lastTryResult);
      if (!loginRes) {
        loginRes = lastTryResult;
      }
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
      store.setLastTry(email, null);
      store.addChatList(email, storeChatList);
      client.on("chat_deleted", (p1, p2) => {
        console.log("chat_deleted p1: ", p1);
        console.log("chat_deleted p2: ", p2);
      });
      client.on("chat", (data, channel) => {
        console.log("Chat called");
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
    }
  } catch (error) {
    console.error(error);
    res.json({
      error,
      message: "Failed to login",
    });
  }
});

//export this router to use in our server.js
module.exports = router;
