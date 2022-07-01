import styled from 'styled-components';
import { BtnProps } from 'types/atoms';

export const Btn = styled.button<BtnProps>`
  background-color: ${(props) => props.theme.colors.btnColor};
  width: 130px;
  height: 40px;
  font-size: 0.8rem;
  font-weight: bold;
  color: ${(props) => props.theme.colors.basicBlack};
  border: none;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  width: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '150px';
      case 'md':
        return '180px';
      case 'lg':
        return '200px';
      default:
        return '130px';
    }
  }};
  &:hover {
    background-color: ${(props) => props.theme.colors.btnColorHover};
  }
`;
