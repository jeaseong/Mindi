import React from 'react';
import Image from 'components/atoms/image/Image';
import { IMAGE } from '../../../utils/image';
import { MainTemplate } from './Main.style';
import { MainButton } from './Main.style';
import { useNavigate } from 'react-router-dom';
import { templateVariants, childVariants } from './framer';

function Main1() {
  const navigate = useNavigate();

  return (
    <MainTemplate
      variants={templateVariants}
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <Image width='35%' src={IMAGE.NEW_LOGO.url} alt={IMAGE.NEW_LOGO.alt} />
      <MainButton
        onClick={() => {
          navigate('/main');
        }}
        variants={childVariants}
        initial='normal'
        animate='point'
        whileHover='hover'
      >
        CLICK!
      </MainButton>
    </MainTemplate>
  );
}

export default Main1;
