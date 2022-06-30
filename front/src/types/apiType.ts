export interface SignUpInfo {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface SignInInfo {
  email: string;
  password: string;
}

export interface DiaryInfo {
  userId: string;
  diary: string;
  feeling: string;
  background?: File;
}

export interface diary {
  diary: string;
}

export interface VerifyEmail {
  email: string;
}

export interface UserInfo {
  name: string;
  password: string;
}
