import styled from 'styled-components';

export const InputBox = styled.input`
  width: 100%;
  font-size: 0.8rem;
  padding: 10px;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.basic};
  background-color: inherit;
  &:focus {
    outline: none;
  }
`;
