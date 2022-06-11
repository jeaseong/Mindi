import React from 'react';
import { Head } from './Heading.style';
import { TextProps } from 'components/types/atoms';
function Heading({ children }: TextProps) {
  return <Head>{children}</Head>;
}

export default Heading;
