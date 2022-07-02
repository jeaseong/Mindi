import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Hilight = styled.span`
  color: ${(props) => props.theme.colors.anger};
`;
