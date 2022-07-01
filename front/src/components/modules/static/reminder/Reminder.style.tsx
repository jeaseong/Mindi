import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 50px;
`;

export const MockContainer = styled(Container)`
  filter: blur(4px);
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
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
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
  padding: 4px;
  line-height: 22px;
  width: 100%;
  height: 144px;
  white-space: pre-wrap;
  word-break: break-all;
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
`;
