import express from "express";
import fetch from "node-fetch";
// import { createWriteStream } from "fs";
// import { resolve } from "path";

// import { store } from "../store";

const router = express.Router();

router.get("/", async (req, res) => {
  fetch(
    "http://th-m1.talk.kakao.com/th/talkm/oYpU69JQce/HEGxQisvWXKKiVoINxRCk1/i_077d75503acd_120x120.jpg"
  )
    .then((res) => res.buffer())
    .then(async (body) => {
      // const fileBuffer = await body.arrayBuffer();
      console.log("body: ", body.toString("base64"));
      // var imageName = "uploads/test.png";
      // const result =
      //   createWriteStream(imageName)
      //   .write(new Uint8Array(fileBuffer));
    });

  // var imageName = "uploads/test.png";
  // console.log("result: ", resolve(__dirname, "..", imageName));
  // res.sendFile(resolve(__dirname, "..", imageName));
  res.json({});
});

//export this router to use in our server.js
export default router;
