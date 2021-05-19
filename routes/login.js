const express = require("express");
const router = express.Router();

const store = require("../store/index");

const { AuthApiClient, TalkClient } = require("node-kakao");

router.get("/", async (req, res) => {
  const { email, password } = req.body;
  const DEVICE_UUID = "f8895281da8661d50d2ee951b3068fd8";
  const DEVICE_NAME = "FSD_AMMY_PC";
  const authApi = await AuthApiClient.create(DEVICE_NAME, DEVICE_UUID);
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
