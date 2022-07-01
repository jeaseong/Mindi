import styled from 'styled-components';

export const CommentWrapper = styled.div`
  margin-top: 15px;
  height: 100%;
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

  @media screen and (max-width: 480px) {
    height: 70px;
    margin-bottom: 150px;
  }
`;

export const CommentContainer = styled.form`
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const CommentInput = styled.textarea`
  flex: 8;
  resize: none;
  width: 100%;
  height: 40px;
  border: 2px solid transparent;
  padding: 2px;
  background-color: rgba(255, 255, 255, 0.6);
  outline: none;
  font-size: 16px;
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

  @media screen and (max-width: 480px) {
    position: absolute;
    width: 370px;
    height: 100px;
    bottom: 130px;
    right: 55px;
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
