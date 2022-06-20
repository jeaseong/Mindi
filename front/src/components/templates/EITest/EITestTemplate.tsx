import EITest from 'components/modules/EITest/EITest';
import React from 'react';
import { StyledTemplate } from './EITestTemplate.style';
import {
  PageTitle,
  Lines,
  LineTop,
  LineBottom,
} from '../../atoms/pageTitle/pageTitle.style';

function EITestTemplate() {
  return (
    <StyledTemplate>
      <PageTitle>EI Test</PageTitle>
      <Lines>
        <LineTop />
        <LineBottom />
      </Lines>
      <EITest />
    </StyledTemplate>
  );
}

export default EITestTemplate;
