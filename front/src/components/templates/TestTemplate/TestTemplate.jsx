import React, { useState } from 'react';
import TestList from './TestData.json';
import styled from 'styled-components';

import Title from 'components/atoms/span/title/Title';
import Big from 'components/atoms/span/big/Big';

import { StyledTemplate } from './TestTemplate.style';
import RadioButton from '../../atoms/radioButton/RadioButton';

function TestTemplate() {
  const [loading, setLoading] = useState(false);
  const [selections, setSelections] = useState([Object.keys(TestList).map((x) => [])]);

  const submitHandler = () => {
    console.log(selections);
  };

  const handleChange = (selection, index) => {
    let tempState = { ...selections };
    tempState[index] = selection;
    setSelections(tempState);
  };

  return (
    <StyledTemplate>
      <header>
        <Title>Emotional Intelligence Test</Title>
      </header>

      {TestList.map((item, index) => {
        return (
          <div key={item.id}>
            <section className='questions'>
              <Big>{item.question}</Big>
            </section>

            <StyledForm className='answers'>
              <span>Disagree</span>
              <RadioButton
                type='radio'
                color='#2ecc71'
                name='answer'
                value={item.answers[0]}
                checked={selections[index] === 1}
                onChange={() => handleChange(1, index)}
              />

              <RadioButton
                type='radio'
                color='#3498db'
                name='answer'
                value={item.answers[1]}
                checked={selections[index] === 2}
                onChange={() => handleChange(2, index)}
              />

              <RadioButton
                type='radio'
                color='#f1c40f'
                name='answer'
                value={item.answers[2]}
                checked={selections[index] === 3}
                onChange={() => handleChange(3, index)}
              />

              <RadioButton
                type='radio'
                color='#e74c3c'
                name='answer'
                value={item.answers[3]}
                checked={selections[index] === 4}
                onChange={() => handleChange(4, index)}
              />
              <span>Agree</span>
            </StyledForm>
          </div>
        );
      })}
      <div className='button_container'>
        <button className='btn' onClick={submitHandler}>
          <span>Submit</span>
        </button>
      </div>
    </StyledTemplate>
  );
}
export default TestTemplate;

const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;
