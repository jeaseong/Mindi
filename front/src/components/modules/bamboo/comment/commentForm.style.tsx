import styled from 'styled-components';

export const CommentWrapper = styled.form`
  margin-top: 15px;
`;

export const CommentTitle = styled.h3`
  font-weight: 400;
`;

export const CommentLine = styled.hr`
  width: 100px;
  height: 0.5px;
  background-color: black;
  border: none;
  margin-bottom: 5px;
`;

export const CommentText = styled.div`
  height: 170px;
  margin-top: 3px;
  display: block;
  overflow: auto;
`;

export const CommentInput = styled.textarea`
  resize: none;
  width: 435px;
  height: 155px;
  border: 2px solid transparent;
  background-color: rgba(255, 255, 255, 0.6);
  outline: none;
  font-size: 16px;
  line-height: 1.4;
  transition: all 0.2s;
  border-radius: 2px;

  :hover {
    cursor: pointer;
    background-color: rgb(234, 200, 229);
  }
  :focus {
    cursor: text;
    color: #333333;
    background-color: white;
    border-color: #333333;
  }
`;

export const CommentButton = styled.button`
  cursor: pointer;
  background-color: transparent;
  font-size: 13px;
  margin-top: 5px;
  padding: 7px 25px;
  border: 1px solid black;
  display: inline;
  float: right;
`;

export const CommentList = styled.li`
  list-style: none;
  margin-bottom: 10px;
`;
