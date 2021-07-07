import { Long } from "node-kakao";

import { downloadFile } from "./files";

const checkIfDeletedSign = (message: any) => {
  const check1 = message.text.includes("feedType");
  const check2 = message.text.includes("logId");
  const check3 = message.text.includes("hidden");
  const check4 = message.text.includes("true");
  if (check1 && check2 && check3 && check4) {
    return true;
  }
  return false;
};

export const getAllMessages = async (
  item: any,
  lastChatLogId: Long,
  startChatLogId: number,
  clientUserId: Long,
  email: string,
  nickname: string
) => {
  const myWorkingPromise = new Promise(
    async (resolve: (value: { newMessages: object[] }) => void, reject) => {
      try {
        let allMessages;
        if (startChatLogId > 0) {
          allMessages = await item.syncChatList(
            lastChatLogId,
            Long.fromValue(startChatLogId)
          );
        } else {
          allMessages = await item.syncChatList(lastChatLogId);
        }
        let messageStore: object[] = [] as object[];
        while (true) {
          const { value, done } = await allMessages.next();
          if (done) {
            break;
          } else {
            const { result } = value;
            for (let index = 0; index < result.length; index++) {
              const receivedMessageObj = result[index];
              console.log(receivedMessageObj);

              const nextMessage = result[index + 1];
              const isMeSender =
                parseInt(receivedMessageObj.sender.userId) ===
                parseInt(clientUserId.toString());
              const senderName = isMeSender ? email : nickname;
              if (nextMessage) {
                const isDeletedSelf = checkIfDeletedSign(receivedMessageObj);
                // let isDeletedNext = checkIfDeletedSign(nextMessage);
                // if (isDeletedNext) {
                //   continue;
                // } else
                if (isDeletedSelf) {
                  const messageObject: object = {
                    text: receivedMessageObj.text,
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
                  await downloadFile(
                    receivedMessageObj.attachment.thumbnailUrl
                  );
                receivedMessageObj.attachment.urlBase64 = await downloadFile(
                  receivedMessageObj.attachment.url
                );
              } else if (
                receivedMessageObj?.attachment?.thumbnailUrls &&
                receivedMessageObj?.attachment?.imageUrls
              ) {
                receivedMessageObj.attachment.thumbnailUrlsBase64 = [];
                receivedMessageObj.attachment.urlsBase64 = [];
                for (
                  let index = 0;
                  index < receivedMessageObj.attachment.thumbnailUrls.length;
                  index++
                ) {
                  const thumbnailUrl =
                    receivedMessageObj.attachment.thumbnailUrls[index];
                  const imgUrl = receivedMessageObj.attachment.imageUrls[index];
                  const thumbnailBase64: string = await downloadFile(
                    thumbnailUrl
                  );
                  receivedMessageObj.attachment.thumbnailUrlsBase64.push(
                    thumbnailBase64
                  );
                  const imgBase64: string = await downloadFile(imgUrl);
                  receivedMessageObj.attachment.urlsBase64.push(imgBase64);
                }
              } else if (
                receivedMessageObj.text === "voice note" &&
                receivedMessageObj.attachment?.url
              ) {
                const audioBase64: string = await downloadFile(
                  receivedMessageObj.attachment.url
                );
                receivedMessageObj.attachment.audioBase64 = audioBase64;
              }
              const msgObj: object = {
                text: receivedMessageObj.text,
                receiverUserName: isMeSender ? nickname : email,
                attachment: receivedMessageObj.attachment,
                received: true,
                senderName,
                sendAt: receivedMessageObj.sendAt,
                logId: parseInt(receivedMessageObj.logId),
              };
              messageStore.push(msgObj);
            }
          }
        }
        console.info("messageStore helper------", messageStore.length);
        resolve({ newMessages: messageStore });
      } catch (error) {
        reject(error);
      }
    }
  );
  return await myWorkingPromise;
};
