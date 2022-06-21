import React from 'react';
import { CalenderProps } from 'types/atoms';
function Head({ year, month, onChangeMonth }: CalenderProps) {
  return <CalenderHeader></CalenderHeader>;
}

export default React.memo(Head);
