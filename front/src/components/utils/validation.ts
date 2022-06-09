import {
  PasswordVType,
  UserInfoVType,
  PasswordReturnType,
} from 'components/types/validation';

/**
 * 이메일 형식을 정규식으로 검사
 * @param email
 * @returns {boolean}을 반환합니다.
 */

const emailValidate = (email: string) => {
  const emailRule =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRule.test(email);
};

/**
 * @param type
 * @param password {string}
 * @param confirmPassword {string}
 * @returns { isPassRule: boolean , isSamePassword: boolean} ;
}
 */

const passwordValidate = (
  type: string,
  passwordInfo: PasswordVType,
): PasswordReturnType => {
  const passwordRule = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  const { password, confirmPassword = null } = passwordInfo;

  const isPassRule = passwordRule.test(password);
  const isSamePassword = password === confirmPassword;

  return { isPassRule, isSamePassword };
};

const passwordLoginValidate = (password: string) => {
  const passwordRule = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  return passwordRule.test(password);
};

const signUpValidation = (type: string, info: UserInfoVType) => {
  const { name, email, password, confirmPassword } = info;
  const isCheckName = name.length >= 2;
  const isCheckEmail = emailValidate(email);
  const { isPassRule, isSamePassword } = passwordValidate(type, {
    password,
    confirmPassword,
  });
  return {
    isCheckName,
    isCheckEmail,
    isPassRule,
    isSamePassword,
  };
};

const signInValidation = (info: UserInfoVType) => {
  const { email, password } = info;
  return emailValidate(email) && passwordLoginValidate(password);
};

export const validation = (type: string, info: UserInfoVType) => {
  switch (type) {
    case 'signUp':
      return signUpValidation(type, info);
    case 'signIn':
      return signInValidation(info);
    default:
  }
};
