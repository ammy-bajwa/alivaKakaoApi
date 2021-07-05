const express = require("express");
const router = express.Router();
const { getAllMessages } = require("../helpers/chat");

const store = require("../store/index");

router.post("/", async (req, res) => {
  const { email, nickNameToGetChat, startChatLogId } = req.body;
  const client = store.getClient(email);
  const allList = client.channelList.all();
  let currentUserId = "",
    messageStore = [];
  for (const item of allList) {
    // Here we are getting all the messages from a time stamp
    const { displayUserList, lastChatLogId } = item.info;
    const { nickname } = displayUserList[0];
    if (nickname === nickNameToGetChat) {
      try {
        const data = await item.markRead(lastChatLogId);
        console.log("data: ", data);
      } catch (error) {
        console.error(error);
      }
      if (parseInt(lastChatLogId) > startChatLogId) {
        const { newMessages } = await getAllMessages(
          item,
          lastChatLogId,
          startChatLogId,
          client.clientUser.userId,
          email,
          nickname
        );
        messageStore = newMessages;
        console.info("messageStore routes------", messageStore.length);
      }
      const { userId } = displayUserList[0];
      currentUserId = parseInt(userId);
      break;
    }
  }
  res.json({
    data: { userId: currentUserId, messages: messageStore },
    success: true,
  });
});

//export this router to use in our server.js
module.exports = router;
