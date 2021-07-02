const express = require("express");
const { AuthApiClient, TalkClient } = require("node-kakao");
const router = express.Router();

const store = require("../store/index");

router.post("/sendCode", async (req, res) => {
  const { deviceName, deviceId, email, password } = req.body;
  const authApi = await AuthApiClient.create(deviceName, deviceId);
  const form = { email, password, forced: true };
  store.setAuthApi(authApi);
  authApi
    .requestPasscode(form)
    .then((data) => {
      if (data.success) {
        res.json({
          message: "Code sended to your kiwi device successfully",
          response: data,
        });
      } else {
        res.json({
          message: "Error in sending code to your device",
          error: data,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error in sending code to your device",
        error: err,
      });
    });
  // const client = new TalkClient();
  // client.Auth.requestPasscode(email, password, true)
  //   .then((data) => {
  //     if (data.success) {
  //       res.json({
  //         message: "Code sended to your kiwi device successfully",
  //         response: data,
  //       });
  //     } else {
  //       console.log(data);
  //       res.json({
  //         message: "Error in sending code to your device",
  //         error: data,
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.json({
  //       message: "Error in sending code to your device",
  //       error: err,
  //     });
  //   });
});

router.post("/setCode", async (req, res) => {
  const authApi = store.authApi;
  const { code, email, password } = req.body;
  const form = { email, password, forced: true };
  console.log(authApi.name);
  console.log(authApi.deviceUUID);
  authApi
    .registerDevice(form, code, true)
    .then((data) => {
      if (!data.success) {
        res.json({
          message: "Error in registering your device",
          error: data.status,
        });
      } else {
        res.json({
          message: "Device registere on kiwi successfully",
          response: data,
        });
      }
    })
    .catch((err) => {
      res.json({
        message: "Error in registering your device",
        error: err,
      });
    });
});

//export this router to use in our server.js
module.exports = router;
