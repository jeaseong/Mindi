import multer from 'multer';
import multerS3 from 'multer-s3';
import { Request, Response, NextFunction } from 'express';
import config from '../../config';
import { S3 } from '@aws-sdk/client-s3';

let s3bucket = new S3({
  endpoint: config.s3Endpoint as string,
  region: config.s3region,
  credentials: {
    accessKeyId: config.s3AccessKey as string,
    secretAccessKey: config.s3SecretKey as string,
  },
});

const storage = multerS3({
  s3: s3bucket,
  bucket: config.bucketName as string,
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, callback) => {
    callback(null, `${file.fieldname}_` + Date.now() + `_${file.originalname}`);
  },
  // metadata: (req, file, callback) => {
  //   callback(null, { fieldName: file.fieldname });
  // },
});

const imageUpload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // storage에 저장, 5MB로 제한

async function imageDelete(req: Request, res: Response, next: NextFunction) {
  if (req.body.imageFileName) {
    s3bucket.deleteObject({ Bucket: config.bucketName, Key: req.body.imageFileName });
  }
  next();
}

export { imageUpload, imageDelete };
