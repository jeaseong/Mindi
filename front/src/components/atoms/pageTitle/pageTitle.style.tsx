import styled from 'styled-components';

export const LineTop = styled.hr`
  border: none;
  height: 2px;
  background-color: black;
  width: 60%;
  border-radius: 2em;
`;

export const LineBottom = styled.hr`
  margin-top: 1em;
  border: none;
  height: 1px;
  background-color: black;
  width: 60%;
  border-radius: 2em;
`;

export const Lines = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6em;
`;

export const PageTitle = styled.h1`
  margin: 0.7em 0 0.1em 0;
  padding: 0em 3.7em;
  font-size: 96px;
  font-family: 'Courier New', Courier, monospace;
`;
