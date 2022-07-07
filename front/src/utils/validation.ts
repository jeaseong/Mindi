import { SignUpVType, SignInVType } from 'types/validation';

/**
 * 이메일 형식을 정규식으로 검사
 * @param email
 * @returns {boolean}을 반환합니다.
 */

export const emailValidate = (email: string) => {
  const emailRule =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRule.test(email);
};

/**
 * @param type
 * @param password {string}
 * @returns boolean ;
 * 비밀번호는 문자 + 숫자 + 8자리
 */
export const passwordValidate = (password: string): boolean => {
  const passwordRule = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
  return passwordRule.test(password);
};

const isSamePasswordValidate = (
  password: string,
  passwordConfirm: string,
): boolean => {
  return password === passwordConfirm;
};

export const nameValidate = (name: string) => {
  return name.length >= 2;
};

export const signUpValidation = (info: SignUpVType) => {
  const { name, email, password, confirmPassword } = info;
  const isCheckName = nameValidate(name);
  const isCheckEmail = emailValidate(email);
  const isCheckPassword = passwordValidate(password);
  const isSamePassword = isSamePasswordValidate(password, confirmPassword);
  return {
    isCheckName,
    isCheckEmail,
    isCheckPassword,
    isSamePassword,
  };
};
