export const LABEL = {
  SIGNIN: {
    label: '로그인',
    value: 'signIn',
  },
  SIGNUP: {
    label: '회원가입',
    value: 'signUp',
  },
  NAME: {
    label: 'name',
    value: 'name',
  },
  EMAIL: {
    label: 'email',
    value: 'email',
  },
  PASSWORD: {
    label: 'password',
    value: 'password',
  },
  CONFIRM: {
    label: 'confirmPassword',
    value: 'confirm',
  },
  NOMEMBER: {
    label: '아직 회원이 아니신가요?',
    value: 'visitor',
  },
};

export const SIGNIN_GUIDE = {
  EMAIL: {
    label: '이메일 형식이 올바르지 않습니다.',
  },
  PASSWORD: {
    label: '영문 + 숫자 + 8자리 이상입니다.',
  },
  CONFIRM_PASSWORD: {
    label: '비밀번호가 일치하지 않습니다.',
  },
  NAME: {
    label: '두 글자 이상 적어주세요.',
  },
};

export const ALERT_MESSAGE = {
  SUCCESS_SIGNIN: {
    label: '로그인 성공!',
  },
  SUCCESS_SIGNUP: {
    label: '회원가입 성공!',
  },
  ERROR_SIGNIN: {
    label: '왜 실패한지는 서버에서 에러처리가 필요함.',
  },
  ERROR_SIGNUP: {
    label: '이미 존재하는 메일입니다.',
  },
};

export const HEADER_LINK = {
  DIARY: {
    label: '일기장',
    link: 'diary',
  },
  STATIC: {
    label: '감정통계',
    link: 'static',
  },
  NOTICE_BOARD: {
    label: '대나무숲',
    link: 'notice-board',
  },
  INTRODUCTION: {
    label: '서비스 소개',
    link: 'introduction',
  },
};

export const DATE = {
  DAY: {
    ko: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  },
  MONTH: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
};

type Label = {
  ko: string;
  en: string;
};
interface EmotionType {
  [key: string]: { label: Label };
}

export const EMOTION: EmotionType = {
  HAPPINESS: {
    label: {
      ko: '행복',
      en: 'happiness',
    },
  },
  ANGER: {
    label: {
      ko: '분노',
      en: 'anger',
    },
  },
  AVERSION: {
    label: {
      ko: '혐오',
      en: 'anersion',
    },
  },
  SADNESS: {
    label: {
      ko: '슬픔',
      en: 'sadness',
    },
  },
  FEAR: {
    label: {
      ko: '공포',
      en: 'fear',
    },
  },
  SURPRISED: {
    label: {
      ko: '놀람',
      en: 'surprised',
    },
  },
  MIXED: {
    label: {
      ko: '평온',
      en: 'mixed',
    },
  },
};
