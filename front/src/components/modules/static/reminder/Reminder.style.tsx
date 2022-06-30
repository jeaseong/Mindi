import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  margin: 0 auto;
`;

export const ReminderDiaries = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-top: 50px;
  ${({ theme }) => theme.media.tablet`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`;

export const ReminderDiary = styled.div`
  border: 2px solid black;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ImgContainer = styled.div`
  border: 1px solid black;
`;

export const DiaryPreview = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 144px;
`;
