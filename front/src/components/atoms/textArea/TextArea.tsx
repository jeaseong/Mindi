import React from 'react';
import { TextEdit } from './TextArea.style';
import { TextAreaProps } from 'types/atoms';

function TextArea({ bgColor = 'green', onChange, value }: TextAreaProps) {
  return (
    <TextEdit value={value} onChange={onChange} bgColor={bgColor}></TextEdit>
  );
}

export default React.memo(TextArea);
