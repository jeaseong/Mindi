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
  width: string;
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
