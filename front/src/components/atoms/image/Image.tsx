import React from 'react';
import { Img } from './Image.style';
import { ImgProps } from 'components/types/atoms';
function Image({ src, alt, width }: ImgProps) {
  return <Img width={width} src={src} alt={alt} />;
}

export default Image;
