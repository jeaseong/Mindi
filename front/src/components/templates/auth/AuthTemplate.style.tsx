import styled from 'styled-components';

export const Template = styled.section`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.media.tablet`
    max-width: 1024px;
    flex-direction: row;

  `}
`;
