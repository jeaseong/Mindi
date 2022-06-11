import multer from 'multer';
// import multerS3 from 'multer-s3';
// import AWS from 'aws-sdk';
import fs from 'fs';
import { Request, Response, NextFunction } from 'express';
import { StatusError } from '../../utils/error';

// TODO: 배포시 오류가 발생할 경우를 대비해 사진 저장 서버 연결

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}_` + Date.now() + `_${file.originalname}`);
  },
});

const imageUpload = multer({ storage: storage }); // storage에 저장

function imageDelete(req: Request, res: Response, next: NextFunction) {
  if (req.body.imageFileName) {
    const filePath = 'images/' + req.body.imageFileName;

    if (fs.existsSync(filePath) === false) {
      throw new StatusError(400, '이미지가 존재하지 않습니다.');
    } else {
      fs.unlink(filePath, (error) => {
        if (error) throw new StatusError(500, '이미지 삭제에 실패했습니다.');
      });
    }
  }
  next();
}

export { imageUpload, imageDelete };
