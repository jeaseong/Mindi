import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const ChartSizeBox = styled.div`
  width: 60%;
  margin: 0 auto;

  ${({ theme }) => theme.media.tablet`
    width: 40%;
  `}
`;

export const EmotionIcons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const EmotionIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
`;

export const EmotionCount = styled.span`
  position: absolute;
  right: 8px;
  padding: 2px 6px;
  border-radius: 50%;
  background-color: ${(props) => {
    switch (props.color) {
      case 'sadness':
        return props.theme.colors.sadness;
      case 'anger':
        return props.theme.colors.anger;
      case 'anersion':
        return props.theme.colors.anersion;
      case 'fear':
        return props.theme.colors.fear;
      case 'surprised':
        return props.theme.colors.surprised;
      case 'happiness':
        return props.theme.colors.happiness;
    }
  }};
  color: ${(props) => props.theme.colors.basicWhite};
`;
