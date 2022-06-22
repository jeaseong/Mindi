import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  display: grid;
  grid-auto-rows: minmax(50px, auto);
`;

export const Days = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2px;
`;

interface DayProps {
  isNull: boolean;
}

export const Day = styled.div<DayProps>`
  display: flex;
  width: calc(100% / 7);
  text-align: center;
  background-color: #8ccd96;
  opacity: 0.6;
  border-radius: 65% 50%;
  padding: ${(props) => {
    return props.isNull ? '0px' : '10px';
  }};
`;

export const Span = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 50%;
`;
