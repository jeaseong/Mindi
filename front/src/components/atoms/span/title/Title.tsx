import React, { memo } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

import Span from '../Span';
import { StyledTitle } from './Title.style';

interface TitleProps {
  children?: React.ReactNode;
  color?: string;
  fontSize?: string;
  className?: string;
}

const Title = ({ children, color = 'inherit', className }: TitleProps) => {
  const needProps = {
    color,
  };
  const classCandidate = [className];

  return (
    <StyledTitle {...needProps} className={cn(classCandidate)}>
      <Span width='100%' textAlign='center' size='title'>
        {children}
      </Span>
    </StyledTitle>
  );
};

export default memo(Title);
