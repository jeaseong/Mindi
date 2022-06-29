import React from 'react';
import Text from 'components/atoms/text/Text';
import { TextProps } from 'types/atoms';
import {
  Container,
  OuterBox,
  InnerCircle,
  InnerDeepCircle,
} from './Loader.style';

function Loader({ children }: TextProps) {
  return (
    <Container>
      <Text size='md' align='center'>
        {children}
      </Text>
      <OuterBox>
        <InnerCircle />
        <InnerDeepCircle />
      </OuterBox>
    </Container>
  );
}

export default Loader;
