import React, { memo } from 'react';
import { StyledSpan } from './Span.style';
import { SpanProps } from 'types/atoms';
import cn from 'classnames';

const Span = ({
  children,
  color = 'inherit',
  textAlign = 'left',
  width = 'auto',
  size = 'normal',
  className,
  blockWidth = false,
  onClick,
}: SpanProps) => {
  const needProps = {
    color,
    textAlign,
    width,
    blockWidth,
  };
  const classCandiate = [className, size];

  return (
    <StyledSpan {...needProps} className={cn(classCandiate)} onClick={onClick}>
      {children}
    </StyledSpan>
  );
};

export default memo(Span);
