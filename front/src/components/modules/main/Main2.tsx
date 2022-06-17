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
  return (
    <>
      <MainTemplate>
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
        <ImageWrapper>
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
