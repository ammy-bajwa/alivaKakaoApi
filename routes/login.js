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
    if (response.success) {
      const {
        result: { channelList },
      } = response;
      res.json({
        email,
        password,
        accessToken: loginRes.result.accessToken,
        channelList,
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
