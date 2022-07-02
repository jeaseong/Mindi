import s3bucket from "../loaders/s3bucket";
import config from "../config";
import { StatusError } from "./error";

async function imageDelete(imageFileName: string) {
  return new Promise((resolve, reject) => {
    s3bucket.deleteObject({ Bucket: config.bucketName, Key: imageFileName }, (error, data) => {
      if (error) {
        reject(new StatusError(400, "이미지 삭제에 실패했습니다."));
      } else {
        resolve(data);
      }
    });
  });
}

export { imageDelete };
