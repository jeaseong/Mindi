import React, { memo } from 'react';
import { SpanProps, StyledSpan } from './Span.style';

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
    <StyledSpan {...needProps} className={classCandiate} onClick={onClick}>
      {children}
    </StyledSpan>
  );
};

export default memo(Span);
