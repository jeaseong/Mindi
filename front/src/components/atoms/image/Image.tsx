import React from 'react';
import { Img } from './Image.style';
import { ImgProps } from 'types/atoms';
function Image({ src, alt, width, height = 'auto' }: ImgProps) {
  return <Img width={width} src={src} alt={alt} height={height} />;
}

export default React.memo(Image);
