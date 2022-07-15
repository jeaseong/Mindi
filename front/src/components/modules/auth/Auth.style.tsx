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
  width: 100%;
  min-height: 55px;
  position: relative;
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

export const CheckBtn = styled.button`
  border: none;
  cursor: pointer;
  color: ${(props) => props.theme.colors.basicBlack};
  background-color: transparent;
  font-size: 14px;
  position: absolute;
  right: 10px;
  top: 9px;
  &:disabled {
    opacity: 0.4;
  }
`;
