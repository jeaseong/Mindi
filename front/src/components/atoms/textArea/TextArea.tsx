import React from 'react';
import { TextEdit } from './TextArea.style';
import { TextAreaProps } from 'types/atoms';

function TextArea({ bgColor = 'green', onChange }: TextAreaProps) {
  return <TextEdit onChange={onChange} bgColor={bgColor}></TextEdit>;
}

export default React.memo(TextArea);
