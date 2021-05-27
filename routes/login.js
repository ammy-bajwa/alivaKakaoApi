const express = require("express");
const router = express.Router();

const store = require("../store/index");

const { AuthApiClient, TalkClient } = require("node-kakao");

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
    res.json({
      error: loginRes.status,
      message: "Failed to login",
    });
  } else {
    console.log(`Received access token: ${loginRes.result.accessToken}`);
    const client = new TalkClient();
    store.setClient(client);
    const response = await client.login(loginRes.result);
    const allList = client.channelList.all();
    let chatList = [];
    for (const item of allList) {
      chatList.push(item.info);
    }

    if (response.success) {
      res.json({
        email,
        accessToken: loginRes.result.accessToken,
        chatList,
      });
    } else {
      res.json({
        error: response,
        accessToken,
        message: "Failed to login in Kakao talk",
      });
    }
  }
});

//export this router to use in our server.js
module.exports = router;
