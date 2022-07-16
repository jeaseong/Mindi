import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Input from 'components/atoms/input/Input';
import Button from 'components/atoms/button/Button';
import Text from 'components/atoms/text/Text';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import { signUpPost, signUpVerify } from 'api/api';
import { signUpValidation } from 'utils/validation';
import { LABEL, SIGNIN_GUIDE, ALERT_MESSAGE } from 'utils/constants';
import { AuthContainer, InputBox, CheckBtn } from './Auth.style';

function SignUp() {
  const navigate = useNavigate();
  const { openSnackBar } = useSnackbarContext();
  const [inputData, setInputData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [inputVerifyCode, setInputVerifyCode] = useState('');
  const [isVerifyMail, SetIsVerifyMail] = useState(false);
  const [isCheckVerify, setIsCheckVerify] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
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

  const checkVerifyCode = () => {
    if (inputVerifyCode === verifyCode) {
      openSnackBar(true, '메일 인증이 완료되었습니다.');
      setIsCheckVerify(true);
    } else {
      openSnackBar(false, '인증번호를 확인해주세요.');
    }
  };

  const onPostVerfyCode = async () => {
    try {
      const code = await signUpVerify({ email: email });
      openSnackBar(true, '인증번호를 발송했습니다.');
      setVerifyCode(code);
      SetIsVerifyMail(true);
    } catch (e) {
      openSnackBar(false, '메일 주소를 확인해주세요');
    }
  };

  const onChangeVerifyCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputVerifyCode(e.target.value);
    },
    [],
  );

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
    try {
      await signUpPost({ name, email, password });
      openSnackBar(true, ALERT_MESSAGE.SUCCESS_SIGNUP.label);
      navigate('/sign-in');
    } catch (e) {
      openSnackBar(false, ALERT_MESSAGE.ERROR_SIGNUP.label);
    }
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
          disabled={isVerifyMail}
          onChange={onChange}
          name={`${LABEL.EMAIL.label}`}
          type='text'
          placeholder='email'
        />
        <CheckBtn onClick={onPostVerfyCode} disabled={!isCheckEmail}>
          인증
        </CheckBtn>
        {checkInfo.email && <Text>{SIGNIN_GUIDE.EMAIL.label}</Text>}
      </InputBox>
      <InputBox>
        <Input
          disabled={isCheckVerify}
          onChange={onChangeVerifyCode}
          name={`${LABEL.VERIFY.label}`}
          type='text'
          placeholder='인증번호'
        />
        <CheckBtn onClick={checkVerifyCode} disabled={isCheckVerify}>
          확인
        </CheckBtn>
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
