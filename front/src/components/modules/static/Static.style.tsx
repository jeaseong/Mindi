import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

export const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin: 0 auto;
`;

export const NavBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.2rem;
`;
