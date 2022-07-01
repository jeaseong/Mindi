import styled from 'styled-components';

export const BambooPostStyle = styled.div`
  margin: 2em auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: start;
`;

export const BambooPostForm = styled.form``;

export const TodaysDate = styled.label`
  font-size: 2rem;
`;

export const InputArea = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
`;

export const TitleInput = styled.input`
  margin-top: 0.5rem;
  width: auto;
  background-color: #dddddd;
  color: #666666;
  padding: 0.5em 1em;
  border-radius: 10px;
  border: 2px solid transparent;
  outline: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  transition: all 0.2s;

  :hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
  :focus {
    cursor: text;
    color: #333333;
    background-color: white;
    border-color: #333333;
  }
`;

export const TextInput = styled.textarea`
  margin-top: 1rem;
  width: auto;
  height: 500px;
  background-color: #dddddd;
  color: #666666;
  padding: 1em;
  border-radius: 10px;
  border: 2px solid transparent;
  outline: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 1.4;
  transition: all 0.2s;

  :hover {
    cursor: pointer;
    background-color: #eeeeee;
  }
  :focus {
    cursor: text;
    color: #333333;
    background-color: white;
    border-color: #333333;
  }
`;

export const ButtonArea = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
`;
