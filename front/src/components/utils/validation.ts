import {
  PasswordVType,
  SignUpVType,
  SignInVType,
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

const passwordValidate = (passwordInfo: PasswordVType): PasswordReturnType => {
  const passwordRule = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  const { password, confirmPassword } = passwordInfo;

  const isPassRule = passwordRule.test(password);
  const isSamePassword = password === confirmPassword;

  return { isPassRule, isSamePassword };
};
// 분리해서 사용하는 게 좋은 방법

const passwordLoginValidate = (password: string) => {
  const passwordRule = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  return passwordRule.test(password);
};

export const signUpValidation = (info: SignUpVType) => {
  const { name, email, password, confirmPassword } = info;
  const isCheckName = name.length >= 2;
  const isCheckEmail = emailValidate(email);
  const { isPassRule, isSamePassword } = passwordValidate({
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

export const signInValidation = (info: SignInVType) => {
  const { email, password } = info;
  return emailValidate(email) && passwordLoginValidate(password);
};
