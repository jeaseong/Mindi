import React from 'react';
import Text from 'components/atoms/text/Text';
import { KeywordsProps } from 'types/atoms';
import DefaultValue from '../default.json';
import {
  Container,
  TextRank,
  Title,
  WordBoard,
  WordCount,
  MockContainer,
} from './Keywords.style';

function Keyword({ keywords }: KeywordsProps) {
  if (keywords == undefined) {
    return (
      <MockContainer>
        <Title>Text Rank</Title>
        <TextRank>
          {DefaultValue.result.keywords?.map((word, index) => (
            <WordBoard key={word}>
              <Text align='center' size='sm'>
                {word}
              </Text>
              <WordCount>{index + 1}</WordCount>
            </WordBoard>
          ))}
        </TextRank>
      </MockContainer>
    );
  }
  return (
    <Container>
      <Title>Text Rank</Title>
      <TextRank>
        {keywords?.map((word, index) => (
          <WordBoard key={word}>
            <Text align='center' size='sm'>
              {word}
            </Text>
            <WordCount>{index + 1}</WordCount>
          </WordBoard>
        ))}
      </TextRank>
    </Container>
  );
}

export default Keyword;
