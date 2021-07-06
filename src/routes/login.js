const express = require("express");
const { AuthApiClient, TalkClient, OAuthApiClient } = require("node-kakao");
const router = express.Router();

const store = require("../store/index");
const { chatListHandler } = require("../helpers/login/chatListHandler");

router.post("/logout", async (req, res) => {
  const { email } = req.body;
  const client = store.getClient(email);
  try {
    await client.close();
    res.json({
      success: true,
    });
    console.log(`Client closed for ${email}`);
  } catch (error) {
    res.json({
      success: false,
    });
  }
});

// router.post("/token", async (req, res) => {
//   console.log("req.body: ", req.body);
//   const { accessToken, refreshToken, deviceId, deviceName } = req.body;
//   const authApi = await AuthApiClient.create(deviceName, deviceId);
//   store.setAuthApi(authApi);
//   const authClientResponse = await authApi.login({
//     deviceUUID: deviceId,
//     accessToken: accessToken,
//     refreshToken: refreshToken,
//   });
//   console.log("authClientResponse: ", authClientResponse, KnownAuthStatusCode);
//   res.send("ok");
// });

router.post("/", async (req, res) => {
  const { email, password, deviceName, deviceId, latestLogId } = req.body;
  try {
    const userLoginForm = {
      email,
      password,
      forced: true,
    };
    const oAuthClient = OAuthApiClient.create();
    const authClient = await AuthApiClient.create(deviceName, deviceId);
    let authClientResponse = await authClient.login(userLoginForm);
    if (!authClientResponse.success) {
      res.json({
        error: authClientResponse.status,
        message: "Failed to login",
      });
      return;
    }
    const talkClient = new TalkClient();
    let talkClientResponse = await talkClient.login(authClientResponse.result);
    if (!talkClientResponse.success) {
      authClientResponse = await (
        await oAuthClient
      ).renew(authClientResponse.result);
      talkClient = new TalkClient();
      talkClientResponse = await talkClient.login(
        authClientResponse.result.credential
      );
    }
    if (!talkClientResponse.success) {
      res.json({
        error: talkClientResponse.status,
        message: "Failed to login",
      });
      store.setLastTry(email, authClientResponse);
    } else {
      store.setClient(email, talkClient);
      const allList = talkClient.channelList.all();
      const loggedInUserId = parseInt(talkClientResponse.result.userId);
      const { chatList: chatListWithMessages, biggestChatLog } =
        await chatListHandler(talkClient, allList, email, latestLogId);
      store.setClient(email, talkClient);
      talkClient.on("chat", (data, channel) => {
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
      res.json({
        email,
        loggedInUserId,
        accessToken: authClientResponse.result.accessToken,
        refreshToken: authClientResponse.result.refreshToken,
        chatList: chatListWithMessages,
        biggestChatLog,
      });
      console.log(`Login Success: `);
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
