import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import Text from 'components/atoms/text/Text';
import Button from 'components/atoms/button/Button';
import Edit from './Edit';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import { deleteCurUser } from 'api/api';
import { Container, BtnBox } from './User.style';

function User() {
  const [isEdit, setIsEdit] = useState(false);
  const queryClient = useQueryClient();
  const userState: any = queryClient.getQueryData('userState');
  const navigate = useNavigate();
  const { openSnackBar } = useSnackbarContext();
  const onClickLogOut = async () => {
    sessionStorage.removeItem('userToken');
    await queryClient.resetQueries('userState', { exact: true });
    openSnackBar(true, '로그아웃 되었습니다.');
    navigate('/sign-in');
  };

  const onClickDelUser = async () => {
    await deleteCurUser();
    await queryClient.resetQueries('userState', { exact: true });
    openSnackBar(true, '탈퇴.. 다시 와요ㅠ');
    navigate('/main');
  };

  const onClickEditUser = () => {
    setIsEdit((cur) => !cur);
  };
  return (
    <Container>
      {isEdit ? (
        <Edit onClickEditUser={onClickEditUser} />
      ) : (
        <Text bold={true} size='md'>
          {userState?.name}님 안녕하세요!
        </Text>
      )}
      <BtnBox>
        <Button onClick={onClickLogOut}>로그아웃</Button>
        <Button onClick={onClickEditUser}>회원정보 수정</Button>
        <Button onClick={onClickDelUser}>회원탈퇴</Button>
      </BtnBox>
    </Container>
  );
}

export default User;
