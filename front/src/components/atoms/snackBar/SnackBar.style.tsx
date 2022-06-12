import styled from 'styled-components';
import { SnackBarProps } from 'components/types/atoms';
export const SnackBarContainer = styled.div<SnackBarProps>`
  min-width: 200px;
  height: 40px;
  line-height: 40px;
  padding: 0 5px;
  font-size: 0.7rem;
  text-align: center;
  position: absolute;
  right: 0;
  top: ${(props) => {
    if (props.position === 'topRight') return '20px';
    else return null;
  }};
  bottom: ${(props) => {
    if (props.position === 'bottomRight') return '20px';
    else return null;
  }};
  background-color: ${(props) => {
    return props.type === 'sucessAlert'
      ? `${props.theme.colors.sucessAlert}`
      : `${props.theme.colors.errorAlert}`;
  }};
`;
