import React from 'react';
import Text from 'components/atoms/text/Text';
import { KeywordsProps } from 'types/atoms';
import {
  Container,
  TextRank,
  Title,
  WordBoard,
  WordCount,
} from './Keywords.style';

function Keyword({ keywords }: KeywordsProps) {
  return (
    <Container>
      <Title>Text Rank</Title>
      <TextRank>
        {keywords?.map((word, index) => (
          <WordBoard key={word}>
            <Text size='sm'>{word}</Text>
            <WordCount>{index + 1}</WordCount>
          </WordBoard>
        ))}
      </TextRank>
    </Container>
  );
}

export default Keyword;
