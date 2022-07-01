import React from 'react';
import Result from 'components/modules/diary/result/Result';
import { StyledTemplate } from './ResultTemplate.style';
import {
  PageTitle,
  Lines,
  LineTop,
  LineBottom,
} from 'components/atoms/pageTitle/pageTitle.style';
function ResultTemplate() {
  return (
    <StyledTemplate>
      {/* <PageTitle>
        Today&apos;s <br />
        Emotion
      </PageTitle>
      <Lines>
        <LineTop />
        <LineBottom />
      </Lines> */}
      <Result />
    </StyledTemplate>
  );
}

export default ResultTemplate;
