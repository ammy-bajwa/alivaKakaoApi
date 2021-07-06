// const fetch = require("node-fetch");
import fetch from "node-fetch";

export const convertFileToBase64 = async (file: any) => {
  const base64Promise = new Promise((resolve, reject) => {
    try {
      var reader = new FileReader();
      reader.onload = function (e: any) {
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

export const downloadFile = async (url: any) => {
  const myWorkingPromise = new Promise(async (resolve, reject) => {
    try {
      fetch(url)
        .then((res: any) => res.buffer())
        .then(async (buffer: any) => {
          resolve(buffer.toString("base64"));
        });
    } catch (error) {
      reject(error);
    }
  });
  return await myWorkingPromise;
};
