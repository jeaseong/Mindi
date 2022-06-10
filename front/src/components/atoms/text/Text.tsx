import React from 'react';
import { Span } from './Text.style';
import { TextProps } from 'components/types/text';
function Text({ children }: TextProps) {
  return <Span>{children}</Span>;
}

export default Text;
