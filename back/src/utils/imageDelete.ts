import { s3bucket } from "./s3bucket";
import config from "../config";
import { StatusError } from "./error";

async function imageDelete(imageFileName: string) {
  s3bucket.deleteObject({ Bucket: config.bucketName, Key: imageFileName }, (error) => {
    if (error) {
      throw new StatusError(400, "이미지 삭제에 실패했습니다.");
    }
  });
}

export { imageDelete };
