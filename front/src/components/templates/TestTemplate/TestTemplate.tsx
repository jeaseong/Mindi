import React, { useState } from 'react';
import TestList from '../../utils/TestData.json';
import styled from 'styled-components';

import Title from 'components/atoms/span/title/Title';
import Big from 'components/atoms/span/big/Big';

import { StyledTemplate } from './TestTemplate.style';
import RadioButton from '../../atoms/radioButton/RadioButton';

function TestTemplate() {
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState<any>([
    Object.keys(TestList).map((x) => []),
  ]);

  const submitHandler = () => {
    console.log(selections);
  };

  const handleChange = (selection: number, index: number) => {
    const tempState = { ...selections };
    console.log(tempState);
    tempState[index] = selection;
    setSelections(tempState);
  };

  return (
    <StyledTemplate>
      <header>
        <Title>Emotional Intelligence Test</Title>
      </header>

      {TestList.map((item: any, index: any) => {
        return (
          <div key={item.id}>
            <StyledQuestion className='questions'>
              <Big>{item.question}</Big>
            </StyledQuestion>
            <StyledAnswer className='answers'>
              <span>Disagree</span>
              <RadioButton
                color='#2ecc71'
                name='answer'
                value={item.answers[0]}
                checked={selections[index] === 1}
                onChange={() => handleChange(1, index)}
              />

              <RadioButton
                color='#3498db'
                name='answer'
                value={item.answers[1]}
                checked={selections[index] === 2}
                onChange={() => handleChange(2, index)}
              />

              <RadioButton
                color='#f1c40f'
                name='answer'
                value={item.answers[2]}
                checked={selections[index] === 3}
                onChange={() => handleChange(3, index)}
              />

              <RadioButton
                color='#e74c3c'
                name='answer'
                value={item.answers[3]}
                checked={selections[index] === 4}
                onChange={() => handleChange(4, index)}
              />
              <span>Agree</span>
            </StyledAnswer>
          </div>
        );
      })}
      <StyledButtonDiv>
        <button className='submit-button' onClick={submitHandler}>
          <span>Submit</span>
        </button>
      </StyledButtonDiv>
    </StyledTemplate>
  );
}
export default TestTemplate;

const StyledAnswer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4em;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1em;
  margin-bottom: 7em;
`;

const StyledQuestion = styled.section`
  margin-bottom: 1.5em;
`;
