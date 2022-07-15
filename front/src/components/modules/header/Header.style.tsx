import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 90%;
  height: 65px;
  margin: 0 auto;
  margin-bottom: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  border-bottom: 1px solid ${(props) => props.theme.colors.basicBlack};
  position: relative;
  ${({ theme }) => theme.media.tablet`
      display: grid;
      grid-template-columns: 1fr 4fr 1fr;
  `}
`;

export const NavBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:active {
    outline: none;
  }
  &:hover {
    transform: scale(1.2);
  }
  ${({ theme }) => theme.media.tablet`
      display: none;
  `}
  z-index: 20;
`;

export const Nav = styled.nav`
  width: 100%;
  height: 100%;
  display: none;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => theme.media.tablet`
    display: flex;
  `}
`;

export const NavItem = styled.span`
  font-size: 12px;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }
  ${({ theme }) => theme.media.tablet`
 font-size: 16px;
  `}
`;

export const LogOut = styled.p`
  cursor: pointer;
`;

export const DropdownNav = styled.nav`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

export const DropdownNavItem = styled.span`
  font-size: 14px;
  padding: 12px;
  text-align: center;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #fff4cb;
  }
`;
