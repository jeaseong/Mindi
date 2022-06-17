import React from 'react';
import { Span } from './Text.style';
import { TextProps } from 'types/atoms';
function Text({ children }: TextProps) {
  return <Span>{children}</Span>;
}

export default Text;
