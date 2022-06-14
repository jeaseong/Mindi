import styled from 'styled-components';

export interface SpanProps {
  children?: React.ReactNode;
  color?: string;
  textAlign?: 'left' | 'right' | 'center';
  width?: string;
  size?: 'small' | 'normal' | 'big' | 'title';
  blockWidth?: boolean;
  className?: string;
  [prop: string]: any;
  onClick?: (e: React.MouseEvent<HTMLSpanElement>) => void;
}

export const StyledSpan = styled.span<SpanProps>`
  color: ${(props: SpanProps) => props.color || 'black'};
  text-align: ${(props: SpanProps) => props.textAlign};
  width: ${(props) => (props.blockWidth ? '100%' : props.width)};
  word-wrap: break-word;
  word-break: break-all;

  &.small {
    padding: 0.5em 0.3em;
    font-size: 1rem;
  }
  &.normal {
    padding: 1em 2em;
    font-size: 1.2rem;
  }
  &.big {
    padding: 1em 0.9em;
    font-size: 1.2rem;
    font-weight: bold;
  }
  &.title {
    padding: 1.3em 1.84em;
    font-size: 2rem;
    font-weight: bold;
  }
`;
