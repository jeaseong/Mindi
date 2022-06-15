import EITest from 'components/modules/EITest/EITest';
import React from 'react';
import Title from 'components/atoms/span/title/Title';
import { StyledTemplate } from './EITestTemplate.style';

function EITestTemplate() {
  return (
    <StyledTemplate>
      {/* <header> */}
      <Title>Emotional Intelligence Test</Title>
      {/* </header> */}
      <EITest />
    </StyledTemplate>
  );
}

export default EITestTemplate;
