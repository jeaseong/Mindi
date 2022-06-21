import styled from 'styled-components';

export const Wrap = styled.section`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.media.tablet`
    flex-direction: row;
    
  `}
`;
