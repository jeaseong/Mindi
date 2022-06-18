import React from 'react';
import Image from 'components/atoms/image/Image';
import { IMAGE } from 'components/utils/image';
import {
  MainTemplate,
  ImageWrapper,
  EITestButton,
  ToEITest,
} from './Main.style';
import { MainButton } from './Main.style';
import { useNavigate } from 'react-router-dom';

function Main2() {
  const navigate = useNavigate();

  const commonVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 1 },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0.2,
    },
    visible: {
      opacity: 1,
      transition: { duration: 1, yoyo: Infinity },
    },
  };

  return (
    <>
      <MainTemplate
        variants={commonVariants}
        initial='hidden'
        animate='visible'
      >
        <Image width='30%' src={IMAGE.NEW_LOGO.url} alt={IMAGE.NEW_LOGO.alt} />
        <MainButton
          onClick={() => {
            navigate('/sign-in');
          }}
        >
          LOGIN!
        </MainButton>
      </MainTemplate>
      <ToEITest>
        <ImageWrapper
          variants={imageVariants}
          initial='hidden'
          animate='visible'
        >
          <Image
            width='25%'
            src={IMAGE.MAIN_DOODLE.url}
            alt={IMAGE.MAIN_DOODLE.alt}
          />
          <EITestButton
            onClick={() => {
              navigate('/EI-test');
            }}
          >
            감성 지수 테스트
          </EITestButton>
        </ImageWrapper>
      </ToEITest>
    </>
  );
}

export default Main2;
