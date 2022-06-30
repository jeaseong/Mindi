import styled from 'styled-components';

export const AuthContainer = styled.form`
  display: flex;
  width: 80%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin: 0 auto;
`;

export const InputBox = styled.div`
  width: 80%;
  min-height: 55px;
`;

export const NavUser = styled.div`
  width: 100%;
  font-size: 12px;
  color: ${(props) => props.theme.colors.basicBlack};
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.media.tablet`
      font-size: 14px;
  `}
  a {
    transition: all 0.2s ease-in-out;
    &:hover {
      color: #000000;
    }
  }
`;
