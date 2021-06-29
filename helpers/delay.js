const causeDelay = async (time) => {
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

module.exports = { causeDelay };
