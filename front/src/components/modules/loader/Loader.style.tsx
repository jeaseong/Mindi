import styled, { keyframes } from 'styled-components';

const loadingAnimation = keyframes`
    0%, 100% {
      transform: scale(0);
    }
    50% {
        transform: scale(1);
    }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const OuterBox = styled.span`
  position: relative;
  width: 80px;
  height: 80px;
  margin-top: 20px;
`;

export const InnerCircle = styled.span`
  position: absolute;
  height: 80px;
  width: 80px;
  background-color: rgb(74, 144, 226);
  border-radius: 100%;
  opacity: 0.6;
  top: 0px;
  left: 0px;
  animation: 2.1s ease-in-out 0s infinite normal none running
    ${loadingAnimation};
`;

export const InnerDeepCircle = styled(InnerCircle)`
  animation: 2.1s ease-in-out 1s infinite normal none running
    ${loadingAnimation};
`;
