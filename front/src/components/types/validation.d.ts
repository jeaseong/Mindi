export type PasswordVType = {
  password: string;
  confirmPassword: string | '';
};

export type PasswordReturnType = {
  isPassRule: boolean;
  isSamePassword?: boolean;
};

export type UserInfoVType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string | '';
};
