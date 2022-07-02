import styled from 'styled-components';

export const CalenderHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

export const Nav = styled.div`
  width: 50%;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({ theme }) => theme.media.tablet`
    width: 70%;
  `}
`;

export const Year = styled.p`
  font-size: 2rem;
`;

export const NavBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.2rem;
`;

export const Days = styled.ul`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Day = styled.li`
  width: calc(100% / 7);
  text-align: center;
  &:nth-child(7n + 1),
  :nth-child(7n) {
    color: #969696;
  }
`;
