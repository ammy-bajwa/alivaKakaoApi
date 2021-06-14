const express = require("express");
const router = express.Router();
const { Long } = require("node-kakao");

const store = require("../store/index");

router.post("/", async (req, res) => {
  const { email, nickNameToGetChat, lastMessageTimeStamp, startChatLogId } =
    req.body;
  console.log("startChatLogId: ", startChatLogId);
  console.log("isWorking: ", Long.isLong({ startChatLogId }));
  const client = store.getClient(email);
  const allList = client.channelList.all();
  let currentUserId = "",
    messageStore = [];
  for (const item of allList) {
    // Here we are getting all the messages from a time stamp
    const { displayUserList, lastChatLogId } = item.info;
    const { nickname } = displayUserList[0];
    if (nickname === nickNameToGetChat) {
      // const test = await item.chatListStore.since(lastMessageTimeStamp);
      let syncedList = await item.syncChatList(lastChatLogId);
      if (startChatLogId > 0) {
        syncedList = await item.syncChatList(
          lastChatLogId,
          Long.fromValue(startChatLogId)
        );
      }
      messageStore = [];
      while (true) {
        const { value, done } = await syncedList.next();
        if (done) {
          break;
        } else {
          const { result } = value;
          for (let index = 0; index < result.length; index++) {
            const receivedMessageObj = result[index];
            const isMeSender =
              parseInt(receivedMessageObj.sender.userId) ===
              parseInt(client.clientUser.userId);
            const senderName = isMeSender ? email : nickname;
            const msgObj = {
              text: receivedMessageObj.text,
              receiverUserName: isMeSender ? nickname : email,
              attachment: receivedMessageObj.attachment,
              received: true,
              senderName,
              sendAt: receivedMessageObj.sendAt,
              logId: parseInt(receivedMessageObj.logId),
            };
            console.log(receivedMessageObj.logId);

            if (receivedMessageObj.sendAt > lastMessageTimeStamp) {
              messageStore.push(msgObj);
            }
          }
        }
      }
      const { userId } = displayUserList[0];
      currentUserId = parseInt(userId);
      break;
    }
  }
  console.log("messageStore: ", messageStore.length);
  res.json({
    data: { userId: currentUserId, messages: messageStore },
    success: true,
  });
});

//export this router to use in our server.js
module.exports = router;
