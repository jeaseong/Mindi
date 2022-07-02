import multer from "multer";
import multerS3 from "multer-s3";
import config from "../../config";
import s3bucket from "../../loaders/s3bucket";

const storage = multerS3({
  s3: s3bucket,
  bucket: config.bucketName as string,
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (req, file, callback) => {
    callback(null, `${file.fieldname}_` + Date.now() + `_${file.originalname}`);
  },
});

const imageUpload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // storage에 저장, 5MB로 제한

export default imageUpload;
