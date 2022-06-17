import React from 'react';
import Image from 'components/atoms/image/Image';
import { IMAGE } from 'components/utils/image';
import { MainTemplate } from './Main.style';
import { MainButton } from './Main.style';
import { useNavigate } from 'react-router-dom';

function Main1() {
  const navigate = useNavigate();

  const templateVariants = {
    hidden: {
      y: 50,
      rotateZ: 180,
      opacity: 0.5,
      scale: 0.2,
    },
    visible: {
      y: 0,
      rotateZ: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        when: 'beforeChildren',
      },
    },
  };

  const childVariants = {
    normal: { scale: 0 },
    point: {
      scale: 1,
      transition: {
        delay: 0.3,
        type: 'spring',
        stiffness: 400,
      },
    },
    hover: { scale: 1.2, color: 'red' },
  };

  return (
    <MainTemplate
      variants={templateVariants}
      initial='hidden'
      animate='visible'
    >
      <Image width='30%' src={IMAGE.NEW_LOGO.url} alt={IMAGE.NEW_LOGO.alt} />
      <MainButton
        onClick={() => {
          navigate('/main/2');
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
