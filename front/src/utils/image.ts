const url = process.env.PUBLIC_URL;
export const IMAGE = {
  LOADER: {
    url: `${url}/assets/loader.gif`,
    alt: '로딩중',
  },
  AUTH_LOGO: {
    url: `${url}/assets/auth_logo.png`,
    alt: '서비스 로고',
  },
  AUTH_MIDDLE: {
    url: `${url}/assets/auth_middle.png`,
    alt: '중앙선',
  },
  IMG_UPLOAD_BASIC: {
    url: `${url}/assets/img_upload.png`,
    alt: '업로드 기본 사진입니다.',
  },
  LOGO_EFFECT_LINE: {
    url: `${url}/assets/logo_effect_line.png`,
    alt: '로고 집중선',
  },

  LOGO_TEXT: {
    url: `${url}/assets/logo_text.png`,
    alt: '로고 텍스트',
  },

  NEW_LOGO: {
    url: `${url}/assets/logo.png`,
    alt: '서비스 로고',
  },

  MAIN_DOODLE: {
    url: `${url}/assets/main_doodle.png`,
    alt: '글씨 강조 동그라미',
  },

  MAIN_DOODLE_FLIP: {
    url: `${url}/assets/main_doodle_2.png`,
    alt: '글씨 강조 동그라미',
  },

  RESULT_EFFECT: {
    url: `${url}/assets/result_effect.png`,
    alt: '캐릭터 뒤 집중선',
  },
};

type sentimentsType = {
  [key: string]: { [key: string]: string };
};

export const SENTIMENTS: sentimentsType = {
  HAPPINESS: {
    url: `${url}/assets/happiness.png`,
    alt: '행복 캐릭터',
    comment: '행복한 하루였네요! 오늘 하루는 어떠세요?',
  },
  ANGER: {
    url: `${url}/assets/anger.png`,
    alt: '화남 캐릭터',
    comment: '화가 났던 하루였네요ㅠ 항상 응원합니다.',
  },
  AVERSION: {
    url: `${url}/assets/aversion.png`,
    alt: '혐오 캐릭터',
    comment: '당신도 혐오스러워!',
  },
  SADNESS: {
    url: `${url}/assets/sadness.png`,
    alt: '슬픔 캐릭터',
    comment: '뿌엥ㅠ',
  },
  FEAR: {
    url: `${url}/assets/scared.png`,
    alt: '두려움 캐릭터',
    comment: '살려주세요..제발요..',
  },
  SURPRISED: {
    url: `${url}/assets/surprised.png`,
    alt: '놀람 캐릭터',
    comment: '으엌!',
  },
  MIXED: {
    url: `${url}/assets/relaxed.png`,
    alt: '평온 캐릭터',
    comment: '흠흠흠',
  },
};
