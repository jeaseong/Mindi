import styled from 'styled-components';
import { CardProps } from 'types/atoms';

export const DiaryPosts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  ${({ theme }) => theme.media.tablet`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`;

export const DiaryPost = styled.article`
  height: 200px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid black;
`;

export const Date = styled.h3`
  display: inline-block;
  padding: 4px;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme.colors.basicWhite};
  font-weight: normal;
  margin-bottom: 8px;
`;

export const PreviewPost = styled.div<CardProps>`
  width: 100%;
  height: 100%;
  padding: 10px;
  background-color: #fff4cb;
  position: relative;
  &:before {
    content: '';
    background: url(${(props) => props.bgImg}) no-repeat center center;

    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.6;
  }
`;
