import React from 'react';
import { InputBox } from './Input.style';
import { InputProps } from 'components/types/atoms';

function Input({
  name,
  placeholder,
  type,
  onChange,
  required = true,
}: InputProps) {
  return (
    <InputBox
      name={name}
      type={type}
      placeholder={placeholder.toUpperCase()}
      onChange={onChange}
      required={required}
    />
  );
}
export default Input;
