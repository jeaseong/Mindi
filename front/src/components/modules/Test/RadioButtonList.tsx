import React, { memo } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

import RadioButton from 'components/atoms/radioButton/RadioButton';

interface RadioButtonListProps {
  children?: React.ReactNode;
  data?: RadioButtonData[];
  className?: string;
}

interface RadioButtonData {
  id: number;
}

const StyledRadioButtonList = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonList = ({ children, data = [], className }: RadioButtonListProps) => {
  const classCandidate = [className];
  const buttons = data.map((v) => <RadioButton key={v.id}></RadioButton>);

  return (
    <StyledRadioButtonList className={cn(classCandidate)}>
      {buttons}
      {children}
    </StyledRadioButtonList>
  );
};

export default memo(ButtonList);
