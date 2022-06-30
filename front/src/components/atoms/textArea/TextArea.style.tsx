import styled from 'styled-components';
import { TextAreaProps } from 'types/atoms';
export const TextEdit = styled.textarea<TextAreaProps>`
  width: 100%;
  min-height: 300px;
  overflow: visible;
  resize: none;
  white-space: pre;
  background-color: ${(props) => {
    return props.bgColor === 'green'
      ? `${props.theme.colors.postingGreen}`
      : `${props.theme.colors.postingRed}`;
  }};
  opacity: 0.8;
  padding: 6px;
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    background-color: #f1ffde;
  }
`;
