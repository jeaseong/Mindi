import React from 'react';
import Image from 'components/atoms/image/Image';
import { IMAGE } from 'components/utils/image';
import { MainTemplate } from './Main.style';
import { MainButton } from './Main.style';
import { useNavigate } from 'react-router-dom';

function Main1() {
  const navigate = useNavigate();
  return (
    <MainTemplate
      initial={{ y: 50, rotateZ: 180, scale: 0.2 }}
      animate={{ y: 0, rotateZ: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      <Image width='30%' src={IMAGE.NEW_LOGO.url} alt={IMAGE.NEW_LOGO.alt} />
      <MainButton
        onClick={() => {
          navigate('/main/2');
        }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        CLICK!
      </MainButton>
    </MainTemplate>
  );
}

export default Main1;
