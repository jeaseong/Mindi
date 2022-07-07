import React from 'react';
import { Span } from './Text.style';
import { TextProps } from 'types/atoms';
function Text({ children, align, size, bold = false, mb }: TextProps) {
  return (
    <Span size={size} align={align} bold={bold} mb={mb}>
      {children}
    </Span>
  );
}

export default React.memo(Text);
