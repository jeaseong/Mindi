import React from 'react';

import { CalenderBodyProps } from 'types/atoms';
import { Container, Days, Day, Span } from './Body.style';

function Body({ totalDate, year, month, TODAY }: CalenderBodyProps) {
  return (
    <Container>
      {totalDate?.map((days, index) => {
        const dataKey = `${year}-${month}-${index}`;
        return (
          <Days key={dataKey}>
            {days?.map((day, i) => {
              const dataKey = `${year}-${month}-${i}`;
              return (
                <Day isNull={day.length === 0 ? true : false} key={dataKey}>
                  <Span>{day}</Span>
                </Day>
              );
            })}
          </Days>
        );
      })}
    </Container>
  );
}

export default React.memo(Body);
