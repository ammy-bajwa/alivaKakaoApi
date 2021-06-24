const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");

router.post("/", async (req, res) => {
  fetch(
    "http://th-m1.talk.kakao.com/th/talkm/oYpU69JQce/HEGxQisvWXKKiVoINxRCk1/i_077d75503acd_120x120.jpg"
  )
    .then((res) => res.blob())
    .then(async (body) => {
      console.log("body: ");
      const fileBuffer = await body.arrayBuffer();
      var imageName = "uploads/test.png";
      const result = fs
        .createWriteStream(imageName)
        .write(new Uint8Array(fileBuffer));
      console.log("result: ", result);
      //   res.sendFile(body);
    });
});

//export this router to use in our server.js
module.exports = router;
