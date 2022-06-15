import React from 'react';
import { Link } from 'react-router-dom';
import Image from 'components/atoms/image/Image';
import { IMAGE } from 'components/utils/image';
import { HEADER_LINK } from 'components/utils/constants';
import { HeaderContainer, Nav, NavItem } from './Header.style';

function Header() {
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
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
