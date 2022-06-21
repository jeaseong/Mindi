import * as dotenv from 'dotenv';
import path from "path";

const envFound = dotenv.config({
  path: path.resolve(__dirname, `../../.env_${process.env.NODE_ENV}`)
});
if (envFound.error) {
  throw new Error('.env 파일을 만들어주세요.️');
}

export default {
  // app 실행 환경
  nodeEnv: process.env.NODE_ENV,

  // 백엔드 포트번호
  port: process.env.SERVER_PORT || 5000,

  // 데이터베이스 URI
  dbURI: process.env.MONGODB_URI || 'MONGODB_URI does not exist in .env file.',

  // jwt 토큰 생성을 위한 secret key
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpirationDate: '1d',

  // 구글 인증을 위한 클라이언트 정보
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

  // api URI의 기본 경로
  api: {
    prefix: '/api',
  },

  s3AccessKey: process.env.NCLOUD_ACCESS_KEY,
  s3SecretKey: process.env.NCLOUD_SECRET_KEY,
  s3Endpoint: process.env.NCLOUD_ENDPOINT,
  s3region: process.env.NCLOUD_REGION,
  bucketName: process.env.NCLOUD_BUCKET_NAME,
};
