const express = require("express");
const router = express.Router();

const store = require("../store/index");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const client = store.getClient(email);
    const allList = client.channelList.all();
    let chatList = {};
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
module.exports = router;
