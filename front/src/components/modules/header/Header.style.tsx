import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 90%;
  height: 65px;
  margin: 0 auto;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  background-color: transparent;
  border-bottom: 1px solid ${(props) => props.theme.colors.basicBlack};
`;

export const Nav = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const NavItem = styled.span`
  font-size: 14px;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`;
