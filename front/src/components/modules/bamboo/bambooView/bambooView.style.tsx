import styled from 'styled-components';

export const CloseArea = styled.div`
  display: inline;
  float: right;
  padding-top: 10px;
  padding-right: 10px;
  cursor: pointer;
  text-shadow: 1px 1px 2px gray;
`;

export const ContentWrapper = styled.section`
  margin: 30px 32px 0px 32px;
`;

export const DateTitleWrapper = styled.section`
  margin-left: auto;
  margin-bottom: 5px;
`;

export const ViewDate = styled.div`
  width: max-content;
  margin-bottom: 5px;
  padding: 0 7px 3px 7px;
`;

export const ViewTitle = styled.div`
  font-size: 20px;
  background-color: white;
  width: max-content;
  padding: 0 7px 3px 7px;
  border-radius: 3px;
`;

export const TextWrapper = styled.section`
  border-radius: 3px;
  padding: 10px 7px 3px 7px;
  height: 300px;
  display: flex;
  justify-content: start;
  background-color: white;
`;

export const ViewText = styled.div`
  display: block;
  overflow: auto;
  word-break: break-all;
  line-height: 25px;
`;

export const Line = styled.hr`
  height: 0.5px;
  background-color: black;
  border: none;
  margin-bottom: 10px;
`;

export const CommentWrapper = styled.section`
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
`;

export const CommentInput = styled.textarea`
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
