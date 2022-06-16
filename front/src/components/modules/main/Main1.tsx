import React from 'react';
import Image from 'components/atoms/image/Image';
import { IMAGE } from 'components/utils/image';
import { MainTemplate } from './Main.style';
import { MainButton } from './Main.style';
import { useNavigate } from 'react-router-dom';

function Main1() {
  const navigate = useNavigate();
  return (
    <MainTemplate>
      <Image width='30%' src={IMAGE.NEW_LOGO.url} alt={IMAGE.NEW_LOGO.alt} />
      <MainButton
        onClick={() => {
          navigate('/main/2');
        }}
      >
        CLICK!
      </MainButton>
    </MainTemplate>
  );
}

export default Main1;
