import React from 'react';
import { CalenderHeadProps } from 'types/atoms';
import Text from 'components/atoms/text/Text';
import { CalenderHeader, Nav, NavBtn, Days, Day } from './Head.style';
import { DATE } from 'utils/constants';

function Head({ year, month, onChangeMonth }: CalenderHeadProps) {
  return (
    <CalenderHeader>
      <Nav>
        <NavBtn onClick={() => onChangeMonth(-1)}>&lt;</NavBtn>
        <Text size='md'>
          {year}. {DATE.MONTH[month - 1]}
        </Text>
        <NavBtn onClick={() => onChangeMonth(1)}>&gt;</NavBtn>
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
