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
  background-color: ${(props) => props.theme.colors.basicWhite};
  font-weight: normal;
  margin-bottom: 8px;
`;

export const AlignRight = styled.div`
  text-align: right;
`;

export const Hilight = styled.span`
  color: ${(props) => props.theme.colors.anger};
`;
