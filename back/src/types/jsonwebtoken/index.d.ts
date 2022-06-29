export {}

declare module "jsonwebtoken" {
  interface JwtPayload {
    _id: string;
  }
}