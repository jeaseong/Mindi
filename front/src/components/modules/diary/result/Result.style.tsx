import styled from 'styled-components';

export const ContentWrapper = styled.div`
  margin: 2em auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const CharacterWrapper = styled.div`
  margin: 50px 0;
  display: flex;
  justify-content: center;
`;

export const CharacterEffect = styled.img`
  margin-bottom: 2.5em;
  position: absolute;
  z-index: -1;
`;
export const Title = styled.span`
  font-size: 1.7em;
  font-weight: bold;
`;

export const Emotion = styled.span`
  font-size: 1.4em;
  margin-top: 1em;
`;

export const SubTitle = styled.span`
  font-size: 1.2rem;
  margin: 100px 0 50px 0;
  ${({ theme }) => theme.media.tablet`
      font-size: 1.4rem;
  `}
`;

export const ChartWrapper = styled.div`
  margin-bottom: 2em;
  width: 100%;
  position: relative;
  ${({ theme }) => theme.media.tablet`
      width: 70%;
      max-width: 400px;
  `}
`;

export const YouTubeWrapper = styled.div`
  width: 100%;
  margin-top: 2em;
`;

export const ButtonWrapper = styled.div`
  margin: 100px 50px 0;
  display: flex;
  width: 100%;
`;

export const ResultButton = styled.div`
  margin-left: auto;
`;

export const ButtonLine = styled.hr`
  margin-top: 1em;
  border: none;
  height: 0.5px;
  background-color: black;
  width: 40%;
  border-radius: 2em;
  ${({ theme }) => theme.media.tablet`
      width: 70%;
  `}
`;

export const DiaryAndFeeling = styled.section`
  margin: 0 auto;
  margin-top: 50px;
  text-align: left;
  line-height: 1.5;
  font-size: 14px;
  ${({ theme }) => theme.media.tablet`
      font-size: 16px;
  `}
`;

export const DiaryWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 50px;
`;

export const ImgWrapper = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

export const FeelingWrapper = styled.div`
  margin-top: 20px;
`;

export const Diarytitle = styled.h4``;

export const Feelingtitle = styled.h4``;

export const BlurBox = styled.div`
  width: 100%;
  height: 100%;
  filter: blur(4px);
`;

export const BlurText = styled.span`
  position: absolute;
  z-index: 2;
  margin: 0 auto;
  right: 0;
  left: 0;
  top: 50%;
  background-color: #fafafa;
  font-size: 20px;
  width: 100%;
  padding: 10px 20px;
`;
