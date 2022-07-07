import React, { useState, useCallback } from 'react';
import { useQueryClient } from 'react-query';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import Input from 'components/atoms/input/Input';
import Button from 'components/atoms/button/Button';
import { EditCurUser } from 'api/api';
import { LABEL } from 'utils/constants';
import { passwordValidate, nameValidate } from 'utils/validation';
import { EditUserProps } from 'types/atoms';
import { EditContainer, BtnBox } from './User.style';

function Edit({ onClickEditUser }: EditUserProps) {
  const queryClient = useQueryClient();
  const { openSnackBar } = useSnackbarContext();
  const userState: any = queryClient.getQueryData('userState');
  const [inputData, setInputData] = useState({
    name: userState.name,
    password: '',
  });

  const isCheckPassword = passwordValidate(inputData.password);
  const isCheckName = nameValidate(inputData.name);
  const isCheck = isCheckPassword && isCheckName;

  const onSubmitEditUser = async () => {
    await EditCurUser(inputData);
    queryClient.invalidateQueries('userState');
    onClickEditUser();
    openSnackBar(true, '유저 정보를 수정했습니다.');
  };

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((cur) => {
      return {
        ...cur,
        [name]: value,
      };
    });
  }, []);
  return (
    <EditContainer>
      <Input
        required
        onChange={onChange}
        name={LABEL.NAME.label}
        type='text'
        placeholder='name'
        value={inputData.name}
      />
      <Input
        required
        onChange={onChange}
        name={LABEL.PASSWORD.label}
        type='password'
        placeholder='password'
        value={inputData.password}
      />
      <BtnBox>
        <Button disabled={!isCheck} onClick={onSubmitEditUser}>
          확인
        </Button>
        <Button onClick={onClickEditUser}>취소</Button>
      </BtnBox>
    </EditContainer>
  );
}

export default Edit;
