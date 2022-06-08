import styled from 'styled-components';
import { BtnProps } from 'components/types/button';

export const Btn = styled.button<BtnProps>`
  background-color: ${(props) => props.theme.colors.btnColor};
  width: 70px;
  height: 30px;
  font-size: 0.7rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.colors.btnColorHover};
  }
`;
