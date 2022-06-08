import React, { useState } from 'react';
import TestList from './TestData.json';

function TestPage() {
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
    <section>
      <header>
        <h1>Emotional Intelligence</h1>
      </header>

      {TestList.map((item, index) => {
        return (
          <div key={item.id}>
            <section className='questions'>
              <h4>{item.question}</h4>
            </section>

            <form className='answers'>
              <span>Disagree</span>
              <input
                type='radio'
                name='answer'
                value={item.answers[0]}
                checked={selections[index] === 1}
                onChange={() => handleChange(1, index)}
              />

              <input
                type='radio'
                name='answer'
                value={item.answers[1]}
                checked={selections[index] === 2}
                onChange={() => handleChange(2, index)}
              />

              <input
                type='radio'
                name='answer'
                value={item.answers[2]}
                checked={selections[index] === 3}
                onChange={() => handleChange(3, index)}
              />

              <input
                type='radio'
                name='answer'
                value={item.answers[3]}
                checked={selections[index] === 4}
                onChange={() => handleChange(4, index)}
              />
              <span>Agree</span>
            </form>
          </div>
        );
      })}
      <div className='button_container'>
        <button className='btn' onClick={submitHandler}>
          <span>Submit</span>
        </button>
      </div>
    </section>
  );
}
export default TestPage;
