import styled from 'styled-components';
import { TextProps } from 'types/atoms';

export const TitleBox = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.basicBlack};
`;

export const Title = styled.h1<TextProps>`
  display: inline-block;
  padding: 4px 10px;
  letter-spacing: 8px;
  margin-bottom: 6px;
  border-bottom: 2px solid ${(props) => props.theme.colors.basicBlack};
  font-size: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '2rem';
      case 'md':
        return '3rem';
      case 'lg':
        return '4rem';
      default:
        return '2rem';
    }
  }};
`;
