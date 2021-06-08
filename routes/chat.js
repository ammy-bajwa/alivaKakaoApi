const express = require("express");
const router = express.Router();

const store = require("../store/index");

router.post("/", async (req, res) => {
  const { email, nickNameToGetChat, lastMessageTimeStamp } = req.body;
  const client = store.getClient(email);
  const allList = client.channelList.all();
  let currentUserId = "",
    messageStore = [];
  for (const item of allList) {
    const { displayUserList } = item.info;
    const { nickname } = displayUserList[0];
    if (nickname === nickNameToGetChat) {
      const { userId } = displayUserList[0];
      const allChat = (await item.getChatListFrom()).result;
      currentUserId = parseInt(userId);
      messageStore = [];
      for (const message of allChat) {
        const isMeSender =
          parseInt(message.sender.userId) ===
          parseInt(client.clientUser.userId);
        const senderName = isMeSender ? email : nickname;
        const msgObj = {
          text: message.text,
          receiverUserName: isMeSender ? nickname : email,
          attachment: message.attachment,
          received: true,
          senderName,
          sendAt: message.sendAt,
        };
        if (message.sendAt > lastMessageTimeStamp) messageStore.push(msgObj);
      }
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
