import React from 'react';
import { IMAGE } from 'utils/image';
import {
  Container,
  MainTemplate,
  ImageWrapper,
  EITestButton,
  Buttons,
  ToEITest,
  ToRegister,
  MainImg,
  BottomImg,
  LogoText,
  RegisterButton,
} from './Main.style';
import { MainButton } from './Main.style';
import { useNavigate } from 'react-router-dom';

function Main2() {
  const navigate = useNavigate();

  const commonVariants = {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
      transition: { duration: 0.5, when: 'beforeChildren' },
    },
    exit: {
      opacity: 0,
      scale: 0,
    },
  };

  const LogoEffectVariants = {
    animate: {
      scale: 1,
      rotate: 360,
      transition: { duration: 15, loop: Infinity, ease: 'linear' },
    },
  };

  const EITestImgVariants = {
    initial: {
      // opacity: 0.1,
      rotate: -2,
    },
    animate: {
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
    <Container>
      <MainTemplate
        variants={commonVariants}
        initial='initial'
        animate='animate'
        exit='exit'
      >
        <MainImg
          width='50%'
          src={IMAGE.LOGO_EFFECT_LINE.url}
          alt={IMAGE.LOGO_EFFECT_LINE.alt}
          variants={LogoEffectVariants}
          initial='initial'
          animate='animate'
        />
        <LogoText
          width='30%'
          src={IMAGE.LOGO_TEXT.url}
          alt={IMAGE.LOGO_TEXT.alt}
        />
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
      <Buttons>
        <ToRegister>
          <BottomImg
            width='170px'
            src={IMAGE.MAIN_DOODLE_FLIP.url}
            alt={IMAGE.MAIN_DOODLE_FLIP.alt}
            variants={EITestImgVariants}
            initial='initial'
            animate='animate'
          />
          <RegisterButton
            variants={childVariants}
            whileHover='hover'
            onClick={() => {
              navigate('/sign-up');
            }}
          >
            가입하기
          </RegisterButton>
        </ToRegister>
        <ToEITest>
          <BottomImg
            width='220px'
            src={IMAGE.MAIN_DOODLE.url}
            alt={IMAGE.MAIN_DOODLE.alt}
            variants={EITestImgVariants}
            initial='initial'
            animate='animate'
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
        </ToEITest>
      </Buttons>
    </Container>
  );
}

export default Main2;
