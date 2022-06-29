import axios from "axios";
import config from "../config";

export default async () => {
  axios.defaults.baseURL = `${config.aiURL}/diaries`;
  axios.defaults.timeout = 10000; // 10초 제한 //TODO: 시간 제한 어쩌지...?
};
