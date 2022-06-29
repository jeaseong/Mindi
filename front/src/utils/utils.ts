import { DateType, SentimentsType, EmotionType } from 'types/atoms';

export const getCurDate = () => {
  return new Date(+new Date() + 3240 * 10000).toISOString().split('T')[0];
};
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
  if (sorted[0][1] === 0) return 'mixed';
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
