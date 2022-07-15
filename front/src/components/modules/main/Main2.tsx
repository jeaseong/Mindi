import React from 'react';
import { useQueryClient } from 'react-query';
import { IMAGE } from 'utils/image';
import {
  Container,
  MainTemplate,
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
import {
  commonVariants,
  LogoEffectVariants,
  EITestImgVariants,
  RightVariants,
} from './framer';

function Main2() {
  const queryClient = useQueryClient();
  const userState = queryClient.getQueryData('userState');
  const navigate = useNavigate();

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
        {userState ? (
          <MainButton
            variants={RightVariants}
            initial='initial'
            animate='animate'
            whileHover='hover'
            onClick={() => {
              navigate('/diary');
            }}
          >
            DIARY!
          </MainButton>
        ) : (
          <MainButton
            variants={RightVariants}
            initial='initial'
            animate='animate'
            whileHover='hover'
            onClick={() => {
              navigate('/sign-in');
            }}
          >
            LOGIN!
          </MainButton>
        )}
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
          {userState ? (
            <RegisterButton
              variants={RightVariants}
              whileHover='hover'
              onClick={() => {
                navigate('/bamboo-grove');
              }}
            >
              대나무숲
              <br /> &rarr;
            </RegisterButton>
          ) : (
            <RegisterButton
              variants={RightVariants}
              whileHover='hover'
              onClick={() => {
                navigate('/sign-up');
              }}
            >
              가입하기
            </RegisterButton>
          )}
        </ToRegister>
        <ToEITest>
          <BottomImg
            width='230px'
            src={IMAGE.MAIN_DOODLE.url}
            alt={IMAGE.MAIN_DOODLE.alt}
            variants={EITestImgVariants}
            initial='initial'
            animate='animate'
          />
          <EITestButton
            variants={RightVariants}
            whileHover='hover'
            onClick={() => {
              navigate('/EI-test');
            }}
          >
            감성 지수 테스트 <br /> &rarr;
          </EITestButton>
        </ToEITest>
      </Buttons>
    </Container>
  );
}

export default Main2;
