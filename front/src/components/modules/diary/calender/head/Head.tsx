import React from 'react';
import { CalenderProps } from 'types/atoms';
import Span from 'components/atoms/span/Span';
import { CalenderHeader, Nav, NavBtn, Days, Day } from './Head.style';
import { DATE } from 'utils/constants';

function Head({ year, month, onChangeMonth }: CalenderProps) {
  return (
    <CalenderHeader>
      <Nav>
        <NavBtn>&lt;</NavBtn>
        <Span>
          {year}. {DATE.MONTH[month]}
        </Span>
        <NavBtn>&gt;</NavBtn>
      </Nav>
      <Days>
        {DATE.DAY.en.map((d) => (
          <Day key={d}>{d}</Day>
        ))}
      </Days>
    </CalenderHeader>
  );
}

export default React.memo(Head);
