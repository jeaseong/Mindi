import { NONAME } from 'dns';
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
  border: 1px solid black;
`;

export const PreviewPost = styled.div<CardProps>`
  width: 100%;
  height: 144px;
  padding: 10px;
  margin-top: 10px;
  line-height: 22px;
  background-color: ${(props) => {
    return props.bgImg ? '#fff4cb' : '#fff4cb';
  }};
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  &:before {
    content: '';
    background-image: url(${(props) => props.bgImg});
    background-size: 60% 60%;
    background-repeat: no-repeat;
    background-position: center;
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.3;
  }
`;
