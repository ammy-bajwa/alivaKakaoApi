import express from "express";
import {
  AuthApiClient,
  TalkClient,
  OAuthApiClient,
  TalkChatData,
  TalkChannel,
} from "node-kakao";

import { store } from "../store";
import { chatListHandler } from "../helpers/login/chatListHandler";
import { onChatHandler } from "../helpers/login/onChatHandler";

const router = express.Router();

router.post("/logout", async (req: any, res: any) => {
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

interface LoginBodyType {
  email: string;
  password: string;
  deviceName: string;
  deviceId: string;
  latestLogId: number;
}

router.post("/", async (req: any, res: any) => {
  const { email, password, deviceName, deviceId, latestLogId }: LoginBodyType =
    req.body;
  try {
    const userLoginForm = {
      email,
      password,
      forced: true,
    };
    const oAuthClient: OAuthApiClient = await OAuthApiClient.create();
    const authClient: AuthApiClient = await AuthApiClient.create(
      deviceName,
      deviceId
    );
    let authClientResponse: any = await authClient.login(userLoginForm);
    if (!authClientResponse.success) {
      res.json({
        error: authClientResponse.status,
        message: "Failed to login",
      });
      return;
    }
    let talkClient = new TalkClient();
    let talkClientResponse: any = await talkClient.login(
      authClientResponse.result
    );
    if (!talkClientResponse.success) {
      authClientResponse = await oAuthClient.renew(authClientResponse.result);
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
      const { chatList: chatListWithMessages, biggestChatLog }: any =
        await chatListHandler(talkClient, allList, email, latestLogId);
      talkClient.on("chat", (data: TalkChatData, channel: TalkChannel) =>
        onChatHandler(data, channel, email)
      );
      res.json({
        email,
        loggedInUserId,
        accessToken:
          authClientResponse.result?.accessToken ||
          authClientResponse.result?.credential?.accessToken,
        refreshToken:
          authClientResponse.result?.refreshToken ||
          authClientResponse.result?.credential?.refreshToken,
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
export default router;
