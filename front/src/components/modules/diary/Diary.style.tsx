import styled from 'styled-components';

export const DiaryCalendar = styled.section`
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
  display: grid;
  grid-template-rows: 1fr 300px;
  gap: 20px;

  ${({ theme }) => theme.media.tablet`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  `}
`;

export const DiaryList = styled.section`
  padding-bottom: 50px;
`;
