import styled from 'styled-components';

export const TitleBox = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.basicBlack};
`;

export const Title = styled.h1`
  display: inline-block;
  padding: 4px 10px;
  font-size: 2rem;
  letter-spacing: 8px;
  margin-bottom: 6px;
  border-bottom: 2px solid ${(props) => props.theme.colors.basicBlack};
`;
