import styled from 'styled-components';

export const Img = styled.img`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  object-fit: fill;
`;
