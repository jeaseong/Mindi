import styled from 'styled-components';

export const PostingContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Area = styled.div``;

export const SubTitle = styled.h3`
  display: inline-block;
  padding: 4px;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.colors.basicWhite};
  font-weight: normal;
  margin-bottom: 8px;
`;

export const AlignRight = styled.div`
  text-align: right;
`;
