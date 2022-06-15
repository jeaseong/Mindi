import EITest from 'components/modules/EITest/EITest';
import React from 'react';
import styled from 'styled-components';
import { StyledTemplate } from './EITestTemplate.style';

function EITestTemplate() {
  return (
    <StyledTemplate>
      {/* <header> */}
      <PageTitle>EI Test</PageTitle>
      <Lines>
        <LineTop />
        <LineBottom />
      </Lines>
      {/* </header> */}
      <EITest />
    </StyledTemplate>
  );
}

export default EITestTemplate;

const PageTitle = styled.h1`
  margin: 0.7em 0 0.1em 0;
  padding: 0em 3.7em;
  font-size: 96px;
  font-family: 'Courier New', Courier, monospace;
`;

const LineTop = styled.hr`
  border: none;
  height: 2px;
  background-color: black;
  width: 60%;
  border-radius: 2em;
`;

const LineBottom = styled.hr`
  margin-top: 1em;
  border: none;
  height: 1px;
  background-color: black;
  width: 60%;
  border-radius: 2em;
`;

const Lines = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6em;
`;
