const fetch = require("node-fetch");

const convertFileToBase64 = async (file) => {
  const base64Promise = new Promise((resolve, reject) => {
    try {
      var reader = new FileReader();
      reader.onload = function (e) {
        // The file's text will be printed here
        console.log(e.target.result);
        resolve(e.target.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });

  return await base64Promise;
};

const downloadFile = async (url) => {
  const myWorkingPromise = new Promise(async (resolve, reject) => {
    try {
      fetch(url)
        .then((res) => res.buffer())
        .then(async (buffer) => {
          resolve(buffer.toString("base64"));
        });
    } catch (error) {
      reject(error);
    }
  });
  return await myWorkingPromise;
};

module.exports = { downloadFile, convertFileToBase64 };
