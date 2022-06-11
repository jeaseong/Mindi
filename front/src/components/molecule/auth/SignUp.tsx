import React, { useState, useCallback } from 'react';
import Input from 'components/atoms/input/Input';
import Button from 'components/atoms/button/Button';
import Text from 'components/atoms/text/Text';
import { signUpPost } from 'api/api';
import { signUpValidation } from 'components/utils/validation';
import { LABEL, SIGNIN_GUIDE } from 'components/utils/constants';
import { AuthContainer, InputBox } from './Auth.style';

function SignUp() {
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = inputData;
  const { isCheckName, isCheckEmail, isCheckPassword, isSamePassword } =
    signUpValidation(inputData);

  const isCheck =
    isCheckName && isCheckEmail && isCheckPassword && isSamePassword;

  const checkInfo = {
    name: !isCheckName && name.length > 0,
    email: !isCheckEmail && email.length > 0,
    password: !isCheckPassword && password.length > 0,
    confirmPassword: !isSamePassword && confirmPassword.length > 0,
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
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUpPost(inputData);
  };
  return (
    <AuthContainer onSubmit={onSubmit}>
      <InputBox>
        <Input
          onChange={onChange}
          name={`${LABEL.NAME.label}`}
          type='text'
          placeholder='name'
        />
        {checkInfo.name && <Text>{SIGNIN_GUIDE.NAME.label}</Text>}
      </InputBox>
      <InputBox>
        <Input
          onChange={onChange}
          name={`${LABEL.EMAIL.label}`}
          type='text'
          placeholder='email'
        />
        {checkInfo.email && <Text>{SIGNIN_GUIDE.EMAIL.label}</Text>}
      </InputBox>
      <InputBox>
        <Input
          onChange={onChange}
          name={`${LABEL.PASSWORD.label}`}
          type='password'
          placeholder='password'
        />
        {checkInfo.password && <Text>{SIGNIN_GUIDE.PASSWORD.label}</Text>}
      </InputBox>
      <InputBox>
        <Input
          onChange={onChange}
          name={`${LABEL.CONFIRM.label}`}
          type='password'
          placeholder='password confirm'
        />
        {checkInfo.confirmPassword && (
          <Text>{SIGNIN_GUIDE.CONFIRM_PASSWORD.label}</Text>
        )}
      </InputBox>
      <Button disabled={!isCheck} type='submit'>
        {LABEL.SIGNUP.label}
      </Button>
    </AuthContainer>
  );
}
export default React.memo(SignUp);
