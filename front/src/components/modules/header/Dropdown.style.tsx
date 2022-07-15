import styled, { keyframes } from 'styled-components';
import { DropdownProps } from 'types/atoms';

const slideFadeInDropdown = keyframes`
  0% {
    
    transform: translateY(-100%);
  }
  100% {
    
    transform: translateY(0);
  }
`;

const slideFadeOutDropdown = keyframes`
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-120%);
  }
`;

export const Container = styled.div<DropdownProps>`
  display: ${(props) => {
    return props.visibilityAnimation ? 'flex' : 'none';
  }};
  position: absolute;
  z-index: 10;
  right: 0;
  top: 55px;
  animation: ${(props) => {
      return props.visible ? slideFadeInDropdown : slideFadeOutDropdown;
    }}
    0.4s ease;
  animation-fill-mode: forwards;
  overflow: hidden;

  ${({ theme }) => theme.media.tablet`
      display: none;
  `}
`;
