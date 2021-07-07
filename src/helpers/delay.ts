export const causeDelay = async (time: number) => {
  const base64Promise = new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(true);
      }, time);
    } catch (error) {
      reject(error);
    }
  });

  return await base64Promise;
};
