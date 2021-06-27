const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");

router.get("/", async (req, res) => {
  fetch(
    "http://th-m1.talk.kakao.com/th/talkm/oYpU69JQce/HEGxQisvWXKKiVoINxRCk1/i_077d75503acd_120x120.jpg"
  )
    .then((res) => res.buffer())
    .then(async (body) => {
      // const fileBuffer = await body.arrayBuffer();
      console.log("body: ", body.toString("base64"));
      // var imageName = "uploads/test.png";
      // const result = fs
      //   .createWriteStream(imageName)
      //   .write(new Uint8Array(fileBuffer));
    });

  // var imageName = "uploads/test.png";
  // console.log("result: ", path.resolve(__dirname, "..", imageName));
  // res.sendFile(path.resolve(__dirname, "..", imageName));
  res.json({});
});

//export this router to use in our server.js
module.exports = router;
