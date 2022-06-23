import React from 'react';
import Bamboo from 'components/modules/bamboo/bamboo';
import {
  PageTitle,
  Lines,
  LineTop,
  LineBottom,
} from '../../atoms/pageTitle/pageTitle.style';

function BambooTemplate() {
  return (
    <>
      <PageTitle>
        Bamboo
        <br />
        Grove
      </PageTitle>
      <Lines>
        <LineTop />
        <LineBottom />
      </Lines>
      <Bamboo />
    </>
  );
}

export default BambooTemplate;
