const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.post("/", async (req, res) => {
  fetch(
    "http://th-m1.talk.kakao.com/th/talkm/oYpU69JQce/HEGxQisvWXKKiVoINxRCk1/i_077d75503acd_120x120.jpg"
  )
    .then((res) => res.blob())
    .then((body) => {
      console.log("body: ", body);
      res.json({
        data: "ok",
        success: true,
      });
    });
});

//export this router to use in our server.js
module.exports = router;
