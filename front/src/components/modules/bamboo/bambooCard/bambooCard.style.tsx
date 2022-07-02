import styled from 'styled-components';

import { CardProps } from 'types/atoms';

export const CardWrap = styled.section`
  width: 100%;
  margin: 0 auto;
`;

export const DiaryPosts = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

export const DiaryPost = styled.article`
  height: 20rem;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

export const Date = styled.h4`
  width: max-content;
  display: inline-block;
  padding: 0 4px;
  font-size: 1rem;
  background-color: ${(props) => props.theme.colors.basicWhite};
  font-weight: normal;
`;

export const Title = styled.h3`
  display: inline-block;
  padding: 0px 4px;
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.colors.basicWhite};
  font-weight: normal;
  margin-bottom: 5px;
`;

export const PreviewPost = styled.div<CardProps>`
  width: 100%;
  height: 15.5rem;
  padding: 10px;
  line-height: 22px;
  background-color: #fff4cb;
  position: relative;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  &:before {
    content: '';
    background: url(${(props) => props.bgImg}) no-repeat center center;
    /* position: absolute; */
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    opacity: 0.1;
  }
`;
