import styled from 'styled-components';
import { TextProps } from 'types/atoms';

export const Span = styled.p<TextProps>`
  padding: 0;
  font-size: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '1rem';
      case 'md':
        return '1.2rem';
      case 'lg':
        return '1.4rem';
      default:
        return '0.9rem';
    }
  }};
  margin-bottom: ${(props) => {
    switch (props.mb) {
      case 'sm':
        return '4px';
      case 'md':
        return '10px';
      case 'lg':
        return '20px';
      default:
        return '4px';
    }
  }};
  text-align: ${(props) => props.align};
  font-weight: ${(props) => {
    return props.bold ? 'bold' : 'normal';
  }};
`;

export const HeadOne = styled.h1``;
export const HeadTwo = styled.h2``;
export const HeadThree = styled.h3``;
