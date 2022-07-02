import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import Loader from 'components/modules/loader/Loader';
import Text from 'components/atoms/text/Text';
import Button from 'components/atoms/button/Button';
import Input from 'components/atoms/input/Input';
import { resetPassword } from 'api/api';
import { LABEL } from 'utils/constants';
import { emailValidate } from 'utils/validation';
import { PasswordContainer } from './User.style';

function Password() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { openSnackBar } = useSnackbarContext();

  const isCheckMail = useMemo(() => emailValidate(email), [email]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onSubmitTemporaryPassword = async () => {
    try {
      await resetPassword({ email });
      openSnackBar(true, '임시 비밀번호를 전송했습니다.');
      onChangeLoading();
      navigate('/sign-in');
    } catch (e) {
      onChangeLoading();
      openSnackBar(false, '메일 주소를 확인해 주세요.');
    }
  };
  const onChangeLoading = () => {
    setIsLoading((cur) => !cur);
  };

  if (isLoading) return <Loader>올바른 이메일인지 확인하고 있습니다.</Loader>;
  return (
    <PasswordContainer>
      <Text bold={true} size='md'>
        {LABEL.PASSWORD_RESET.label}
      </Text>
      <Input
        onChange={onChange}
        name={`${LABEL.EMAIL.label}`}
        type='text'
        placeholder='email'
        value={email}
      />
      <Button
        disabled={!isCheckMail}
        onClick={() => {
          onChangeLoading();
          onSubmitTemporaryPassword();
        }}
      >
        전송
      </Button>
    </PasswordContainer>
  );
}

export default Password;
