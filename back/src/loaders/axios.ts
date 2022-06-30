import axios from "axios";
import config from "../config";

export default async () => {
  axios.defaults.baseURL = `${config.aiURL}/diaries`;
};
