import styled from 'styled-components';

export const Template = styled.section`
  width: 80%;
  max-width: 1024px;
  height: auto;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.media.tablet`
    max-width: 1024px;
    flex-direction: row;

  `}
`;
