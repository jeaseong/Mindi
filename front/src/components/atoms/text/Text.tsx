import React from 'react';
import { Span } from './Text.style';
import { TextProps } from 'types/atoms';
function Text({ children, align, size, bold = false }: TextProps) {
  return (
    <Span size={size} align={align} bold={bold}>
      {children}
    </Span>
  );
}

export default React.memo(Text);
