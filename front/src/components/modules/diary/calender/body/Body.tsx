import React from 'react';
import { useQueryClient } from 'react-query';
import { CalenderBodyProps } from 'types/atoms';
import { selectMaxSentiment } from 'utils/utils';
import { Container, Days, Day, Span } from './Body.style';

function Body({ totalDate, year, month, TODAY }: CalenderBodyProps) {
  const queryClient = useQueryClient();
  // return type을 전부 정의해줘야하는가..
  const diary: any = queryClient.getQueryData([
    'diary',
    `${TODAY.slice(0, 7)}-00`,
  ]);
  let count = 0;
  return (
    <Container>
      {totalDate?.map((days, index) => {
        const dataKey = `${year}-${month}-${index}`;
        return (
          <Days key={dataKey}>
            {days?.map((day, i) => {
              const dataKey = `${year}-${month}-${i}`;
              const curKey = `${year}-${
                month >= 10 ? month : `0${month}`
              }-${day}`;
              const sentiment =
                diary && curKey === diary[count]?.diaryDate
                  ? selectMaxSentiment(diary[count++]?.sentiment)
                  : 'none';
              return (
                <Day
                  isToday={curKey === TODAY ? true : false}
                  isNull={day.length === 0 ? true : false}
                  sentiment={sentiment}
                  key={dataKey}
                >
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
