export type PasswordVType = {
  password: string;
  confirmPassword: string;
};

export type PasswordReturnType = {
  isPassRule: boolean;
  isSamePassword?: boolean;
};

export type SignUpVType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignInVType = {
  email: string;
  password: string;
};
