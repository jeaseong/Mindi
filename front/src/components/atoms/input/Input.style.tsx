import styled from 'styled-components';

export const InputBox = styled.input`
  width: 70%;
  font-size: 0.8rem;
  padding: 10px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.basic};
  &:focus {
    outline: none;
  }
`;
