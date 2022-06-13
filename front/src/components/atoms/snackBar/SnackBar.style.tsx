import styled from 'styled-components';
import { SnackBarProps } from 'components/types/atoms';

export const SnackBarContainer = styled.div<SnackBarProps>`
  display: flex;
  align-items: center;
  gap: 7px;
  color: ${(props) => props.theme.colors.basicWhite};
  min-width: 200px;
  height: 40px;
  padding: 0 7px;
  font-size: 0.7rem;
  text-align: center;
  position: absolute;
  right: 0;
  top: ${(props) => {
    if (props.position === 'topRight') return '20px';
    else return null;
  }};
  bottom: ${(props) => {
    if (props.position === 'bottomRight') return '10px';
    else return null;
  }};
  background-color: ${(props) => {
    return props.type === 'sucessAlert'
      ? `${props.theme.colors.sucessAlert}`
      : `${props.theme.colors.errorAlert}`;
  }};
  ${(props) => {
    if (props.isActive) {
      return `
        visibility: visible;
        opacity: 1;
        transform: translateX(-10px);
        transition: linear 0s, opacity 0.4s, transform 0.4s;
      `;
    } else {
      return `
      visibility: hidden;
      opacity: 0;
      transform: translateX(0);
      transition: linear 300ms, opacity 0.4s, transform 0.4s;
      `;
    }
  }}
`;
