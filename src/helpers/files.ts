import fetch, { Response } from "node-fetch";

export const convertFileToBase64 = async (file: Blob) => {
  const base64Promise = new Promise((resolve, reject) => {
    try {
      var reader = new FileReader();
      reader.onload = function (e: ProgressEvent<FileReader>) {
        if (e.target) {
          resolve(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      reject(error);
    }
  });

  return await base64Promise;
};

export const downloadFile = async (url: string) => {
  const myWorkingPromise = new Promise(
    async (resolve: (value: string) => void, reject) => {
      try {
        fetch(url)
          .then((res: Response) => res.buffer())
          .then(async (buffer: Buffer) => {
            resolve(buffer.toString("base64"));
          });
      } catch (error) {
        reject(error);
      }
    }
  );
  return await myWorkingPromise;
};
