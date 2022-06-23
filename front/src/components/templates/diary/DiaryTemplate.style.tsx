import styled from 'styled-components';

export const Wrap = styled.div`
  max-width: 80%;
  width: 100%;
  margin: 0 auto;
`;

export const DiaryCalendar = styled.section`
  height: 500px;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  ${({ theme }) => theme.media.tablet`
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
  `}
`;

export const DiaryList = styled.section``;
