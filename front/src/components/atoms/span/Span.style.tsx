import styled from 'styled-components';
import { SpanProps } from 'types/atoms';

export const StyledSpan = styled.span<SpanProps>`
  color: ${(props: SpanProps) => props.color || 'black'};
  text-align: ${(props: SpanProps) => props.textAlign};
  width: ${(props) => (props.blockWidth ? '100%' : props.width)};
  word-wrap: break-word;
  word-break: break-all;

  &.small {
    font-size: 1rem;
  }
  &.normal {
    padding: 1em 2em;
    font-size: 1.2rem;
  }
  &.big {
    padding: 1em 0.9em;
    font-size: 1.5rem;
    font-weight: bold;
  }
  &.title {
    padding: 1.3em 1.84em;
    font-size: 2rem;
    font-weight: bold;
  }
`;
