import styled from 'styled-components';

export interface RadioButtonProps {
  children?: React.ReactNode;
  flex?: number | 'auto';
  bgColor?: string;
  size?: 'small' | 'big';
  className?: string;
  [prop: string]: any;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const StyledRadioButton = styled.button<RadioButtonProps>`
  flex: ${(props: RadioButtonProps) => props.flex};
  display: flex;
  justify-content: center;
  align-items: stretch;
  border: ${(props: RadioButtonProps) =>
    props.outline === 'none' ? 'none' : `0.7px solid ${props.outline}`};
  background: ${(props: RadioButtonProps) => (props.transparent ? 'transparent' : props.bgColor)};
  cursor: pointer;
  outline: none;

  &.small {
    padding: 7px 7px;
  }

  &.big {
    padding: 14px 14px;
  }
`;
