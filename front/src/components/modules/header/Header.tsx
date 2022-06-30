import React from 'react';
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import Image from 'components/atoms/image/Image';
import { IMAGE } from 'utils/image';
import { useSnackbarContext } from 'contexts/SnackbarContext';
import { HEADER_LINK } from 'utils/constants';
import { HeaderProps } from 'types/atoms';
import { HeaderContainer, Nav, NavItem, LogOut } from './Header.style';

function Header({ isLogin }: HeaderProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { openSnackBar } = useSnackbarContext();
  const onClickLogOut = async () => {
    sessionStorage.removeItem('userToken');
    await queryClient.resetQueries('userState', { exact: true });
    openSnackBar(true, '로그아웃 되었습니다.');
    navigate('/sign-in');
  };

  return (
    <HeaderContainer>
      <Image src={IMAGE.AUTH_LOGO.url} alt={IMAGE.AUTH_LOGO.alt} width='60px' />
      <Nav>
        <NavItem>
          <Link to={HEADER_LINK.DIARY.link}>{HEADER_LINK.DIARY.label}</Link>
        </NavItem>
        <NavItem>
          <Link to={HEADER_LINK.STATIC.link}>{HEADER_LINK.STATIC.label}</Link>
        </NavItem>
        <NavItem>
          <Link to={HEADER_LINK.NOTICE_BOARD.link}>
            {HEADER_LINK.NOTICE_BOARD.label}
          </Link>
        </NavItem>
        <NavItem>
          <Link to={HEADER_LINK.INTRODUCTION.link}>
            {HEADER_LINK.INTRODUCTION.label}
          </Link>
        </NavItem>
        <NavItem>
          {!isLogin ? (
            <Link to={HEADER_LINK.SIGNIN.link}>로그인</Link>
          ) : (
            <LogOut onClick={onClickLogOut}>로그아웃</LogOut>
          )}
        </NavItem>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
