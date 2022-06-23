import axios from "axios";
import config from "../config";

async function postKeywordAnalysis(diary: object) {
  const apiUrl = `${config.aiURL}/diaries/keywords`;
  const { data } = await axios.post(apiUrl, diary);
  return data.result;
}

async function postSentimentAnalysis(feeling: object) {
  const apiUrl = `${config.aiURL}/diaries/sentiment`;
  const { data } = await axios.post(apiUrl, feeling);
  return data.result;
}

export { postSentimentAnalysis, postKeywordAnalysis };
