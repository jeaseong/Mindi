import React from 'react';
import { Span } from './Text.style';
import { TextProps } from 'types/atoms';
function Text({ children, align, size }: TextProps) {
  return (
    <Span size={size} align={align}>
      {children}
    </Span>
  );
}

export default Text;
