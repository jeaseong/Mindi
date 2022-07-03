import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/atoms/text/Text';
import Image from 'components/atoms/image/Image';
import Box from './Box';
import { SENTIMENTS, IMAGE } from 'utils/image';
import { Container, Hilight } from './Introdunction.style';

function Introduction() {
  return (
    <Container>
      <Box>
        <Text bold={true} size='md'>
          &quot;지금 무슨 감정을 느끼세요..?&quot;
        </Text>
      </Box>
      <Box>
        <Image
          src={SENTIMENTS.SADNESS.url}
          alt={SENTIMENTS.SADNESS.alt}
          width='200px'
        />
        <Text bold={true} size='md'>
          슬픈가..?
        </Text>
      </Box>
      <Box>
        <Image
          src={SENTIMENTS.ANGER.url}
          alt={SENTIMENTS.ANGER.alt}
          width='200px'
        />
        <Text bold={true} size='md'>
          화가 나나!?
        </Text>
      </Box>
      <Box>
        <Text bold={true} size='md'>
          &quot;제 감정이 진짜인지 가짜인지 모르겠어요.&quot;
        </Text>
      </Box>
      <Box>
        <Text bold={true} size='md'>
          &quot;누가 내 감정을 알려주면 좋겠어요...&quot;
        </Text>
      </Box>
      <Box>
        <Text bold={true} size='md'>
          Mindi와 함께, <Hilight>인공지능 감정분석</Hilight>으로 내 감정에
          솔직해보자!
        </Text>
      </Box>
      <Box>
        <Link to='/diary'>
          <Image
            src={IMAGE.AUTH_LOGO.url}
            alt={IMAGE.AUTH_LOGO.alt}
            width='300px'
          />
        </Link>
        <Text bold={true} size='md'>
          첫 <Hilight>일기</Hilight>를 작성하러 가 볼까요?
        </Text>
      </Box>
    </Container>
  );
}

export default Introduction;
