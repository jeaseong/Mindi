import styled from 'styled-components';

export const StyledBig = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  padding: 1em 0;
  color: ${(props) => props.color};
`;
