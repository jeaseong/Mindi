export interface BtnProps {
  children?: React.ReactNode;
  size?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export type TextProps = {
  children: React.ReactNode;
};

export type ImgProps = {
  width?: number;
  height?: number;
  src: string;
  alt: string;
};

export type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export interface SnackBarProps {
  position?: 'topRight' | 'bottomRight';
  type?: 'sucessAlert' | 'errorAlert';
  isActive: boolean;
  message?: string;
}
