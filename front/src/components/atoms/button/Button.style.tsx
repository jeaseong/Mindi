import styled from 'styled-components';
import { BtnProps } from 'components/types/atoms';

export const Btn = styled.button<BtnProps>`
  background-color: ${(props) => props.theme.colors.btnColor};
  width: 150px;
  height: 40px;
  font-size: 0.7rem;
  border: none;

  cursor: pointer;
  transition: all 0.1s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.colors.btnColorHover};
  }
`;
