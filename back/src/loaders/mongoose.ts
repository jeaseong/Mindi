import mongoose from "mongoose";
import config from "../config";

export default async () => {
  mongoose
    .connect(config.dbURI)
    .then(() => {
      console.log("mongodb is successfully connected");
    })
    .catch((error) => {
      console.error(error);
    });
};