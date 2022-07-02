import styled from 'styled-components';
import { TextAreaProps } from 'types/atoms';
export const TextEdit = styled.textarea<TextAreaProps>`
  width: 100%;
  margin-top: 4px;
  line-height: 1.5;
  min-height: 300px;
  overflow: visible;
  resize: none;
  white-space: pre-wrap;
  background-color: ${(props) => {
    return props.bgColor === 'green'
      ? `${props.theme.colors.postingGreen}`
      : `${props.theme.colors.postingRed}`;
  }};
  opacity: 0.9;
  padding: 6px;
  &:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    background-color: #f1ffde;
  }
`;
