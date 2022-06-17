import styled from 'styled-components';

export const MainTemplate = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MainButton = styled.button`
  position: absolute;
  margin-top: 3.5em;
  font-family: 'Courier New', Courier, monospace;
  font-size: 2em;
  color: Red;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const ImageWrapper = styled.div`
  display: flex;
  justify-content: right;

  margin: 0 2em;
`;
