import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 50px;
`;

export const Text = styled.div`
  width: 100%;
  height: transparent;
  position: absolute;
  text-align: center;
  top: 30%;
  z-index: 10;
  padding: 10px;
  font-weight: bold;
  font-size: 1.2rem;
  a {
    color: ${(props) => props.theme.colors.fear};
  }
`;

export const BlurBox = styled.div`
  position: relative;
`;

export const ContainerMock = styled(Container)`
  filter: blur(4px);
`;

export const BlurText = styled.div`
  margin-bottom: 5px;
`;

export const ChartSizeBox = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-bottom: 40px;
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
  font-size: 0.9rem;
`;

export const EmotionCount = styled.span`
  position: absolute;
  right: 0;
  top: -10px;
  padding: 2px 6px;
  border-radius: 50%;
  font-size: 0.9rem;
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
  ${({ theme }) => theme.media.tablet`
    font-size: 1.1rem;
  `}
`;
