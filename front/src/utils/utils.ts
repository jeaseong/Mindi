import { DateType, SentimentsType, EmotionType } from 'types/atoms';

// yyyy-mm-dd
export const getCurDate = () => {
  return new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0];
};
/**
 * yyyy-mm-dd
 * yyyy-mm-00
 * yyyy-00-00
 */
export const getDateForString = (
  year: number,
  month: number,
  day: number,
  type: DateType,
) => {
  if (type === 'perYear') return `${year}-00-00`;
  else if (type === 'perMonth')
    return `${year}-${month >= 10 ? month : `0${month}`}-00`;
  else
    return `${year}-${month >= 10 ? month : `0${month}`}-${
      day >= 10 ? day : `0${day}`
    }`;
};

export const nullCheck = (value: any) => {
  if (value !== null && value !== undefined) return value;
};

// string이라는 것을 증명해야함
export const selectMaxSentiment = (sentiments: SentimentsType) => {
  if (!sentiments) {
    throw new Error('sentiments이 없습니다.');
  }
  const sorted = Object.entries(sentiments)?.sort((a, b) => b[1] - a[1]);
  if (sorted[0][1] === 0) return 'blank';
  if (sorted[0][1] === sorted[1][1]) return 'mixed';
  return sorted[0][0];
};

export const selectSentimentValues = (sentimentData: EmotionType) => {
  if (sentimentData) {
    const sentimentValues = Object.values(sentimentData);

    return sentimentValues;
  }
};

export const selectSentimentNames = (sentimentData: EmotionType) => {
  if (sentimentData) {
    const sentimentNames = Object.keys(sentimentData);
    return sentimentNames;
  }
};

//yyyy.mm.dd.형식으로 바꾸기
export const getCustomizedDate = (date: any) => {
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const day = ('0' + date.getDate()).slice(-2);

  return year + '. ' + month + '. ' + day + '. ';
};

export const dateToString = (d: number) => {
  return d >= 10 ? `${d}` : `0${d}`;
};

export const convertUtcToKst = (utc: Date) => {
  const date = new Date(utc);
  const year = `${date.getFullYear()}`;
  const month = dateToString(date.getMonth() + 1);
  const day = dateToString(date.getDate());
  return [year, month, day].join('-');
};

export const convertToUtc = (date: string) => {
  const localDate = new Date(date).toISOString();
};
