export type BtnProps = {
  children: React.ReactNode;
  style?: 'sm' | 'lg';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
