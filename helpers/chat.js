const { Long } = require("node-kakao");
const { downloadFile } = require("./files");

const checkIfDeletedSign = (message) => {
  const check1 = message.text.includes("feedType");
  const check2 = message.text.includes("logId");
  const check3 = message.text.includes("hidden");
  const check4 = message.text.includes("true");
  if (check1 && check2 && check3 && check4) {
    return true;
  }
  return false;
};

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

            const nextMessage = result[index + 1];
            const isMeSender =
              parseInt(receivedMessageObj.sender.userId) ===
              parseInt(clientUserId);
            const senderName = isMeSender ? email : nickname;
            if (nextMessage) {
              const isDeletedSelf = checkIfDeletedSign(receivedMessageObj);
              // let isDeletedNext = checkIfDeletedSign(nextMessage);
              // if (isDeletedNext) {
              //   continue;
              // } else
              if (isDeletedSelf) {
                console.log(receivedMessageObj);
                const messageObject = {
                  text: "This is deleted message sign",
                  receiverUserName: isMeSender ? nickname : email,
                  attachment: receivedMessageObj.attachment,
                  received: true,
                  senderName,
                  sendAt: receivedMessageObj.sendAt,
                  logId: parseInt(receivedMessageObj.logId),
                };
                messageStore.push(messageObject);
                continue;
              }
            }
            if (
              (receivedMessageObj.text === "photo" ||
                receivedMessageObj.text === "사진") &&
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
