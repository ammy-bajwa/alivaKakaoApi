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
    // Here we are getting all the messages from a time stamp
    const { displayUserList } = item.info;
    const { nickname } = displayUserList[0];
    if (nickname === nickNameToGetChat) {
      const unreadMessages = await item.chatListStore.since(
        lastMessageTimeStamp
      );
      console.log(await item.chatListStore.all());
      const { userId } = displayUserList[0];
      messageStore = [];
      let loopControler = 0;
      while (loopControler < 80) {
        const { value, done } = await unreadMessages.next();
        console.log(nickname);
        if (done) {
          break;
        } else {
          const isMeSender =
            parseInt(value.sender.userId) ===
            parseInt(client.clientUser.userId);
          console.log(value);
          const senderName = isMeSender ? email : nickname;
          const msgObj = {
            text: value.text,
            receiverUserName: isMeSender ? nickname : email,
            attachment: value.attachment,
            received: true,
            senderName,
            sendAt: value.sendAt,
          };
          if (lastMessageTimeStamp !== value.sendAt) {
            messageStore.push(msgObj);
          }
        }
        loopControler++;
      }
      currentUserId = parseInt(userId);
      break;
    }
  }
  console.log("messageStore: ", messageStore);
  res.json({
    data: { userId: currentUserId, messages: messageStore },
    success: true,
  });
});

//export this router to use in our server.js
module.exports = router;
