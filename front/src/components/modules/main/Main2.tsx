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
import { motion } from 'framer-motion';

function Main2() {
  const navigate = useNavigate();

  const commonVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { duration: 1, when: 'beforeChildren' },
    },
  };

  const imageVariants = {
    hidden: {
      // opacity: 0.1,
      rotate: -2,
    },
    visible: {
      // opacity: 1,
      rotate: 2,
      transition: { duration: 0.6, yoyo: Infinity },
    },
    hover: { rotate: 180 },
  };

  const childVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.5,
        type: 'spring',
        stiffness: 400,
      },
    },
    hover: { rotate: -10 },
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
          variants={childVariants}
          initial='initial'
          animate='animate'
          whileHover='hover'
          onClick={() => {
            navigate('/sign-in');
          }}
        >
          LOGIN!
        </MainButton>
      </MainTemplate>
      <ToEITest>
        <ImageWrapper>
          <motion.img
            width='27%'
            src={IMAGE.MAIN_DOODLE.url}
            alt={IMAGE.MAIN_DOODLE.alt}
            variants={imageVariants}
            initial='hidden'
            animate='visible'
          />
          <EITestButton
            variants={childVariants}
            whileHover='hover'
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
