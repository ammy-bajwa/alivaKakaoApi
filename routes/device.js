const express = require("express");
const router = express.Router();

const store = require("../store/index");

router.get("/sendCode", async (req, res) => {
  const authApi = store.authApi;
  authApi
    .requestPasscode(form)
    .then((data) => {
      res.json({
        message: "Code sended to your kiwi device successfully",
        response: data,
      });
    })
    .catch((err) => {
      res.json({
        message: "Error in sending code to your device",
        error: err,
      });
    });
});

router.get("/setCode", async (req, res) => {
  const authApi = store.authApi;
  authApi
    .registerDevice(form, req.body.code, true)
    .then((data) => {
      res.json({
        message: "Device registere on kiwi successfully",
        response: data,
      });
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
