import styled from 'styled-components';

export const HeaderContainer = styled.header`
  width: 90%;
  height: 65px;
  margin: 0 auto;
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
  font-size: 0.8rem;
`;
