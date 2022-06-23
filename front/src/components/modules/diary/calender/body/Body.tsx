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
              const curKey = `${year}-${month}-${day}`;
              return (
                <Day
                  isToday={curKey === TODAY ? true : false}
                  isNull={day.length === 0 ? true : false}
                  key={dataKey}
                >
                  <Span isToday={curKey === TODAY ? true : false}>{day}</Span>
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
