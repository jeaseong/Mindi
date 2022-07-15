import styled from 'styled-components';

export const LineTop = styled.hr`
  border: none;
  height: 2px;
  background-color: black;
  width: 100%;
  border-radius: 10px;
  margin-bottom: 10px;
`;

export const LineBottom = styled.hr`
  border: none;
  height: 1px;
  background-color: black;
  width: 100%;
  border-radius: 10px;
`;

export const Lines = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 32px;
  ${({ theme }) => theme.media.tablet`
      font-size: 42px;
  `}
`;
