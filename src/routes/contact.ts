import express from "express";
import { ChatType } from "node-kakao";

import { store } from "../store";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const client = store.getClient(email);
    const allList = client.channelList.all();
    let chatList: any = {};
    for (const item of allList) {
      const { displayUserList, lastChatLogId, newChatCount } = item.info;
      const { nickname, userId, profileURL } = displayUserList[0];
      const currentUserId = parseInt(userId);
      const myLastChatLogId = parseInt(lastChatLogId);
      chatList[nickname] = {
        messages: [],
        profileURL,
        nickname,
        intId: currentUserId,
        newChatCount,
        lastChatLogId: myLastChatLogId,
      };
    }
    res.json({
      data: { chatList },
      success: true,
    });
  } catch (error) {
    res.json({
      message: "Unable to fetch list",
      error: error,
    });
  }
});

//export this router to use in our server.js
export default router;
