import styled from 'styled-components';
import { TextProps } from 'types/atoms';
export const Sub = styled.h3<TextProps>`
  display: inline;
  font-size: 1.2rem;
  padding: 4px 6px;
  background-color: ${(props) => props.theme.colors.basicWhite};
  font-weight: normal;
  margin-bottom: 8px;
  font-size: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '1.2rem';
      case 'md':
        return '1.5rem';
      case 'lg':
        return '2rem';
      default:
        return '1.2rem';
    }
  }};
`;
