import express from "express";

import { store } from "../store";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const client = store.getClient(email);
    const allList = client.channelList.all();
    let chatList: any = {};
    for (const item of allList) {
      const { displayUserList, lastChatLogId } = item.info;
      const { nickname, userId } = displayUserList[0];
      const currentUserId = parseInt(userId);
      const myLastChatLogId = parseInt(lastChatLogId);
      chatList[nickname] = {
        ...item.info,
        messages: [],
        lastChatLogId: myLastChatLogId,
        intId: currentUserId,
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
