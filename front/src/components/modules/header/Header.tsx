import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import Image from 'components/atoms/image/Image';
import useDetectClose from 'hooks/useDetectClose';
import { IMAGE } from 'utils/image';
import { HEADER_LINK } from 'utils/constants';
import { HeaderProps } from 'types/atoms';
import { MdSegment } from 'react-icons/md';
import {
  HeaderContainer,
  Nav,
  NavItem,
  NavBtn,
  DropdownNav,
  DropdownNavItem,
} from './Header.style';

function Header({ isLogin }: HeaderProps) {
  const dropDownRef = useRef(null);
  const [isOpen, onClick] = useDetectClose(dropDownRef, false);

  return (
    <HeaderContainer ref={dropDownRef}>
      <Link to={HEADER_LINK.MAIN.link}>
        <Image
          src={IMAGE.AUTH_LOGO.url}
          alt={IMAGE.AUTH_LOGO.alt}
          width='60px'
        />
      </Link>
      {/* 패드 이상 nav */}
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
            <Link to={HEADER_LINK.SIGNIN.link}>{HEADER_LINK.SIGNIN.label}</Link>
          ) : (
            <Link to={HEADER_LINK.USER.link}>{HEADER_LINK.USER.label}</Link>
          )}
        </NavItem>
      </Nav>
      {/* 햄버거 바 */}
      <NavBtn onClick={onClick as any}>
        <MdSegment size='28' />
      </NavBtn>
      {/* 모바일 nav */}
      <Dropdown onClick={onClick as any} visible={isOpen as boolean}>
        <DropdownNav>
          <DropdownNavItem>
            <Link to={HEADER_LINK.DIARY.link}>{HEADER_LINK.DIARY.label}</Link>
          </DropdownNavItem>
          <DropdownNavItem>
            <Link to={HEADER_LINK.STATIC.link}>{HEADER_LINK.STATIC.label}</Link>
          </DropdownNavItem>
          <DropdownNavItem>
            <Link to={HEADER_LINK.NOTICE_BOARD.link}>
              {HEADER_LINK.NOTICE_BOARD.label}
            </Link>
          </DropdownNavItem>
          <DropdownNavItem>
            <Link to={HEADER_LINK.INTRODUCTION.link}>
              {HEADER_LINK.INTRODUCTION.label}
            </Link>
          </DropdownNavItem>
          <DropdownNavItem>
            {!isLogin ? (
              <Link to={HEADER_LINK.SIGNIN.link}>
                {HEADER_LINK.SIGNIN.label}
              </Link>
            ) : (
              <Link to={HEADER_LINK.USER.link}>{HEADER_LINK.USER.label}</Link>
            )}
          </DropdownNavItem>
        </DropdownNav>
      </Dropdown>
    </HeaderContainer>
  );
}

export default Header;
