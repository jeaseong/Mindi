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
  &:hover {
    background-color: ${(props) => props.theme.colors.btnColorHover};
  }
  ${({ theme }) => theme.media.tablet`
    width: 150px;
  `}
`;
