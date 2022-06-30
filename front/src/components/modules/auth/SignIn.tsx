import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Input from 'components/atoms/input/Input';
import Button from 'components/atoms/button/Button';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import { useSignInHandler } from 'hooks/userQuery';
import { signInValidation } from 'utils/validation';
import { LABEL, HEADER_LINK } from 'utils/constants';
import { AuthContainer, NavUser } from './Auth.style';

function SignIn() {
  const [inputData, setInputData] = useState({
    email: '',
    password: '',
  });
  const { openSnackBar } = useSnackbarContext();
  const logInMutation = useSignInHandler(openSnackBar);
  const isCheck = useMemo(() => signInValidation(inputData), [inputData]);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((cur) => {
      return {
        ...cur,
        [name]: value,
      };
    });
  }, []);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logInMutation.mutate(inputData);
  };
  return (
    <AuthContainer onSubmit={onSubmit}>
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
      <NavUser>
        <Link to={HEADER_LINK.SIGNUP.link}>{LABEL.SIGNUP.comment}</Link>
        <Link to={HEADER_LINK.SIGNUP.link}>{LABEL.PASSWORD_RESET.label}</Link>
      </NavUser>
      <Button disabled={!isCheck} type='submit'>
        {LABEL.SIGNIN.label}
      </Button>
    </AuthContainer>
  );
}
export default React.memo(SignIn);
