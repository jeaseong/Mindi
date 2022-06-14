import React, { memo } from 'react';
import cn from 'classnames';

import Span from '../Span';
import { StyledBig } from './Big.style';

interface BigProps {
  children?: React.ReactNode;
  color?: string;
  fontSize?: string;
  className?: string;
}

const Big = ({ children, color = 'inherit', className }: BigProps) => {
  const needProps = {
    color,
  };
  const classCandidate = [className];

  return (
    <StyledBig {...needProps} className={cn(classCandidate)}>
      <Span width='100%' textAlign='center' size='big'>
        {children}
      </Span>
    </StyledBig>
  );
};

export default memo(Big);
