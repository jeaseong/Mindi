import styled from 'styled-components';
import { CardProps } from 'types/atoms';

export const DiaryPosts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  ${({ theme }) => theme.media.tablet`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`;

export const DiaryPost = styled.article`
  height: 200px;
  padding: 8px;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
  background-color: transparent;
`;

export const PreviewPost = styled.div<CardProps>`
  width: 100%;
  height: 144px;
  font-size: 14px;
  line-height: 1.6;
  padding: 10px;
  background-color: ${(props) => {
    return props.bgImg ? '#fff4cb' : '#fff4cb';
  }};
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  word-wrap: break-word;
  white-space: pre-wrap;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
`;
