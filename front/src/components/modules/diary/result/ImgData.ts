type emotionType = {
  [key: string]: { [key: string]: string };
};

const url = process.env.PUBLIC_URL;

export const SENTIMENTS: emotionType = {
  HAPPINESS: {
    url: `${url}/assets/happiness.png`,
    alt: '행복 캐릭터',
  },
  ANGER: {
    url: `${url}/assets/anger.png`,
    alt: '화남 캐릭터',
  },
  AVERSION: {
    url: `${url}/assets/aversion.png`,
    alt: '혐오 캐릭터',
  },
  SADNESS: {
    url: `${url}/assets/sadness.png`,
    alt: '슬픔 캐릭터',
  },
  SCARED: {
    url: `${url}/assets/scared.png`,
    alt: '두려움 캐릭터',
  },
  SURPRISED: {
    url: `${url}/assets/surprised.png`,
    alt: '놀람 캐릭터',
  },
};
