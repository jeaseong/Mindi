import styled from 'styled-components';
import { IMAGE } from 'utils/image';
export const Container = styled.section`
  width: 100%;
  margin: 0 auto;
  background-color: #1e533d;
  padding: 20px;
  position: relative;
  margin-bottom: 50px;
`;

export const MockContainer = styled(Container)`
  filter: blur(4px);
`;

export const TextRank = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 20px 20px;
  background-image: url(${IMAGE.BACKGROUND.url});
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(45%, auto));
  grid-auto-rows: minmax(80px, auto);
  gap: 20px;
  ${({ theme }) => theme.media.tablet`
    grid-template-columns: repeat(auto-fill, minmax(15%, auto));
  `}
`;

export const Title = styled.h2`
  display: inline-block;
  font-weight: 400;
  text-align: center;
  padding: 0 12px;
  border: 2px solid black;
  transform: skew(10deg);
  background-color: #c5726b;
  position: absolute;
  top: 6px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 120px;
  font-size: 1rem;
  ${({ theme }) => theme.media.tablet`
    width: 200px;
    font-size: 1.2rem;
  `}
`;

export const WordBoard = styled.article`
  background-color: #fff4cb;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const WordCount = styled.p`
  color: ${(props) => props.theme.colors.basicWhite};
  width: 20px;
  text-align: center;
  padding: 2px 4px;
  font-size: 0.9rem;
  border-radius: 50%;
  background-color: #9b6ef3;
  position: absolute;
  top: -10px;
  right: 0;
  left: 0;
  margin: 0 auto;
`;
