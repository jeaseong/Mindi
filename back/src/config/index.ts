import * as dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error(".env 파일을 만들어주세요.️");
}

export default {
  // 백엔드 포트번호
  port: process.env.SERVER_PORT || 5000,

  // 데이터베이스 URI
  dbURI: process.env.MONGODB_URI || "MONGODB_URI does not exist in .env file.",

  // jwt 토큰 생성을 위한 secret key
  jwtSecretKey: process.env.JWT_SECRET_KEY,

  // 구글 인증을 위한 클라이언트 정보
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,

  // api URI의 기본 경로
  api: {
    prefix: "/api"
  }
};