import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  border: 2px solid #000000;
  background-color: #fffff9;
  padding: 10px;
  order: 2;
  ${({ theme }) => theme.media.tablet`
    order: 1;
  `}
`;

export const PreviewBox = styled.div`
  width: 100%;
  height: 86%;
  padding: 20px 10px;
  margin-top: 10px;
  background-color: #fff4cb;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PreviewText = styled.p``;

export const PreviewSentiment = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const NavigateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
