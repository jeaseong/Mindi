export interface HeaderProps {
  isLogin: boolean;
}

export interface BtnProps {
  children?: React.ReactNode;
  size?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type TextProps = {
  children: React.ReactNode;
  align?: string;
  size?: string;
  background?: boolean;
  bold?: boolean;
};

export type TextAreaProps = {
  bgColor?: 'green' | 'red';
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
};

export type ImgProps = {
  width: string;
  height?: string;
  src: string;
  alt: string;
};

export type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  value?: string;
};

export type SnackbarType = 'sucessAlert' | 'errorAlert';

export interface SnackBarProps {
  position?: 'topRight' | 'bottomRight' | 'center';
  type: SnackbarType;
  isActive: boolean;
  message?: string;
}
type openSnackBarType = (sucessAlert: boolean, msg: string) => void;
export interface Snackbar {
  type: SnackbarType;
  message: string;
  isShowing: boolean;
  openSnackBar: openSnackBarType;
}
export interface SpanProps {
  children?: React.ReactNode;
  color?: string;
  textAlign?: 'left' | 'right' | 'center';
  width?: string;
  size?: 'small' | 'normal' | 'big' | 'title';
  blockWidth?: boolean;
  className?: string;
  [prop: string]: any;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export interface BigProps {
  children?: React.ReactNode;
  color?: string;
  fontSize?: string;
  className?: string;
}

export interface RadioProps {
  name: string;
  color: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CardProps {
  bgImg?: string;
}

export interface CustomizedState {
  [date: string]: string;
}

export interface DiaryType {
  _id?: string;
  diary: string;
  feeling: string;
  diaryDate: string;
}

export type DateType = 'perYear' | 'perMonth' | 'perDay';

export interface SentimentsType {
  fear: string;
  surprised: string;
  anger: string;
  sadness: string;
  happiness: string;
  aversion: string;
}

export interface FileType {
  preview: string;
  data: File | undefined;
}

export interface FileProps {
  editImg: FileType;
  onChangeFile: (img: FileType) => void;
}

export interface CalenderProps {
  year: number;
  month: number;
  onChangeMonth: (m: number) => void;
  onSetDay: (d: number) => void;
}

export interface CalenderHeadProps {
  year: number;
  month: number;
  onChangeMonth: (m: number) => void;
}

export interface ListProps {
  year: number;
  month: number;
}

export interface PreviewProps {
  year: number;
  month: number;
  day: number;
}

export interface CalenderBodyProps {
  year: number;
  month: number;
  TODAY: string;
  totalDate: string[][];
  onSetDay: (d: number) => void;
}
// statics type
export type EmotionType = {
  fear: number;
  surprised: number;
  anger: number;
  sadness: number;
  happiness: number;
  aversion: number;
};

export interface EmotionProps {
  emotion: EmotionType;
}

export interface KeywordsProps {
  keywords: string[];
}

export interface UserType {
  _id: string;
  email: string;
  name: string;
  recentLogin: string;
}

export interface EditUserProps {
  onClickEditUser: () => void;
}
export interface ModalProps {
  children: any;
  _handleModal: any;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}
