const { Long } = require("node-kakao");
const { downloadFile } = require("./files");

const getAllMessages = async (
  item,
  lastChatLogId,
  startChatLogId,
  clientUserId,
  email,
  nickname,
  lastMessageTimeStamp = 0
) => {
  const myWorkingPromise = new Promise(async (resolve, reject) => {
    try {
      let allMessages,
        latestTimeStamp = lastMessageTimeStamp;
      if (startChatLogId > 0) {
        allMessages = await item.syncChatList(
          lastChatLogId,
          Long.fromValue(startChatLogId)
        );
      } else {
        allMessages = await item.syncChatList(lastChatLogId);
      }

      messageStore = [];
      while (true) {
        const { value, done } = await allMessages.next();
        if (done) {
          break;
        } else {
          const { result } = value;
          for (let index = 0; index < result.length; index++) {
            const receivedMessageObj = result[index];
            const isMeSender =
              parseInt(receivedMessageObj.sender.userId) ===
              parseInt(clientUserId);
            const senderName = isMeSender ? email : nickname;
            if (
              receivedMessageObj.text === "photo" &&
              receivedMessageObj.attachment &&
              receivedMessageObj?.attachment?.thumbnailUrl
            ) {
              receivedMessageObj.attachment.thumbnailUrlBase64 =
                await downloadFile(receivedMessageObj.attachment.thumbnailUrl);
              receivedMessageObj.attachment.urlBase64 = await downloadFile(
                receivedMessageObj.attachment.url
              );
            }
            const msgObj = {
              text: receivedMessageObj.text,
              receiverUserName: isMeSender ? nickname : email,
              attachment: receivedMessageObj.attachment,
              received: true,
              senderName,
              sendAt: receivedMessageObj.sendAt,
              logId: parseInt(receivedMessageObj.logId),
            };
            if (receivedMessageObj.sendAt > lastMessageTimeStamp) {
              messageStore.push(msgObj);
            }
            if (receivedMessageObj.sendAt > latestTimeStamp) {
              latestTimeStamp = receivedMessageObj.sendAt;
            }
          }
        }
      }
      console.info("messageStore helper------", messageStore.length);
      resolve({ newMessages: messageStore, latestTimeStamp });
    } catch (error) {
      reject(error);
    }
  });
  return await myWorkingPromise;
};

module.exports = { getAllMessages };

// const myFunDesign = async (params) => {
//     const myWorkingPromise = new Promise(async (resolve, reject) => {
//       try {
//         resolve(true);
//       } catch (error) {
//         reject(error);
//       }
//       return await myWorkingPromise;
//     });
