import React from 'react';
import { Head } from './Heading.style';
import { HeadingProps } from 'components/types/heading';
function Heading({ children }: HeadingProps) {
  return <Head>{children}</Head>;
}

export default Heading;
