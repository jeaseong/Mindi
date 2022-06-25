import React from 'react';
import BambooCard from 'components/modules/bamboo/bambooCard/bambooCard';
import {
  PageTitle,
  Lines,
  LineTop,
  LineBottom,
} from '../../atoms/pageTitle/pageTitle.style';
import { Wrap } from './bambooTemplate.style';

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
      <Wrap>
        <BambooCard />
      </Wrap>
    </>
  );
}

export default BambooTemplate;
