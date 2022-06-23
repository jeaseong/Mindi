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
  isToday: boolean;
  sentiment: string;
}

export const Day = styled.div<DayProps>`
  display: flex;
  flex-direction: column;
  width: calc(100% / 7);
  text-align: center;
  opacity: 0.6;
  border-radius: 65% 50%;
  padding: ${(props) => {
    return props.isNull ? '0px' : '10px';
  }};
  ${(props) => {
    return props.isToday ? `border: 2px solid #508A9C` : null;
  }};

  background-color: ${(props) => {
    switch (props.sentiment) {
      case 'fear':
        return '#8ccd96';
      case 'aversion':
        return '#8ccd96';
      case 'surprised':
        return '#8ccd96';
      case 'anger':
        return '#8ccd96';
      case 'sadness':
        return '#8ccd96';
      case 'happiness':
        return '#8ccd96';
      default:
        return null;
    }
  }};
`;

export const Span = styled.span`
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 50%;
`;

export const Today = styled.p`
  font-size: 0.5rem;
`;
