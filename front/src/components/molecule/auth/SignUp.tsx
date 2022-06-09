import React, { useState, useCallback } from 'react';
import Input from 'components/atoms/input/Input';
import Button from 'components/atoms/button/Button';
import { LABEL } from 'components/utils/constants';
import { AuthContainer } from './Auth.style';

function SignUp() {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onClick = () => {
    console.log('클릭하면 뭐다?');
  };
  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputData((cur) => {
        return {
          ...cur,
          [name]: value,
        };
      });
    },
    [inputData],
  );
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('onSubmit');
  };
  return (
    <AuthContainer onSubmit={onSubmit}>
      <Input
        onChange={onChange}
        name={`${LABEL.EMAIL.label}`}
        type='text'
        placeholder='name'
      />
      <Input
        onChange={onChange}
        name={`${LABEL.EMAIL.label}`}
        type='text'
        placeholder='email'
      />
      <Input
        onChange={onChange}
        name={`${LABEL.PASSWORD.label}`}
        type='password'
        placeholder='password'
      />
      <Input
        onChange={onChange}
        name={`${LABEL.CONFIRM.label}`}
        type='password'
        placeholder='password confirm'
      />
      <Button onClick={onClick}>{LABEL.SIGNUP.label}</Button>
    </AuthContainer>
  );
}
export default React.memo(SignUp);
