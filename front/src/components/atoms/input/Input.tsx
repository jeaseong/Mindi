import React from 'react';
import { InputBox } from './Input.style';
import { InputProps } from 'components/types/input';

function Input({ name, placeholder, type, onChange }: InputProps) {
  return (
    <InputBox
      name={name}
      type={type}
      placeholder={placeholder.toUpperCase()}
      onChange={onChange}
    />
  );
}
export default Input;
