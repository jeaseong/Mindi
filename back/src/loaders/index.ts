import expressLoader from "./express";
import mongooseLoader from "./mongoose";
import dependencyLoader from "./dependencies";

export default async ({ expressApp } : { expressApp : any }) => {
  await mongooseLoader();
  await dependencyLoader();
  await expressLoader({ app: expressApp });
}