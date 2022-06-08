import React from 'react';
import { InputBox } from './Input.style';
import { InputProps } from 'components/types/input';

export default function Input({ placeholder }: InputProps) {
  return <InputBox placeholder={placeholder.toUpperCase()} />;
}
