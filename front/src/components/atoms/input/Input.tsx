import React from 'react';
import { InputBox } from './Input.style';
import { InputProps } from 'types/atoms';

function Input({
  name,
  placeholder,
  type,
  onChange,
  required = true,
  disabled = false,
  value,
}: InputProps) {
  return (
    <InputBox
      value={value}
      name={name}
      type={type}
      placeholder={placeholder.toUpperCase()}
      onChange={onChange}
      required={required}
      disabled={disabled}
    />
  );
}
export default Input;
