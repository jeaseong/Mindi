import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  border: 2px solid #000000;
  background-color: #fffff9;
  padding: 0 10px 10px;
  ${({ theme }) => theme.media.tablet`
    order: 2;
  `}
`;
