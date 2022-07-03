import styled from 'styled-components';

export const CommentWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
`;

export const CommentTitle = styled.h3`
  font-weight: 400;
  margin-bottom: 14px;
`;

export const CommentLine = styled.hr`
  width: 100px;
  height: 0.5px;
  background-color: black;
  border: none;
`;

export const CommentText = styled.div`
  height: 200px;
  margin-top: 3px;
  padding: 4px;
  overflow: auto;
  font-size: 14px;
`;

export const CommentContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 6px 0 4px;
  margin-bottom: 10px;
`;

export const CommentInput = styled.textarea`
  flex: 6;
  resize: none;
  width: 100%;
  height: 40px;
  border: 2px solid transparent;
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.6);
  outline: none;
  font-size: 14px;
  line-height: 1.4;
  transition: all 0.2s ease-in-out;
  border-radius: 2px;
  letter-spacing: 1px;

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
  flex: 1;
  cursor: pointer;
  background-color: transparent;
  font-size: 13px;
  border: 1px solid black;
  height: 40px;
`;

export const CommentList = styled.li`
  list-style: none;
  margin-bottom: 10px;
`;
