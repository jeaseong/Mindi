import { S3 } from "@aws-sdk/client-s3";
import config from "../config";

export default new S3({
  endpoint: config.s3Endpoint as string,
  region: config.s3region,
  credentials: {
    accessKeyId: config.s3AccessKey as string,
    secretAccessKey: config.s3SecretKey as string,
  },
});
