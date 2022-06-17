import React from 'react';
import Image from 'components/atoms/image/Image';
import { IMAGE } from 'utils/image';

function Main() {
  return (
    <>
      <Image width='30%' src={IMAGE.NEW_LOGO.url} alt={IMAGE.NEW_LOGO.alt} />
    </>
  );
}

export default Main;
