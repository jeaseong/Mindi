import styled from 'styled-components';

export const RadioWrapper = styled.div`
  display: inline-flexbox;
  flex-wrap: wrap;
`;

export const Mark = styled.span`
  display: inline-block;
  position: relative;
  border: 2px solid #777777;
  width: 40px;
  height: 40px;
  left: 0;
  border-radius: 50%;
  margin: -0.1em 2em;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: center;
  text-align: center;
  line-height: 44px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.33);

  &::after {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: ${(props) => props.color || 'gray'};
    opacity: 0;
    left: 50%;
    top: 50%;
    position: absolute;
    transition: all 110ms;
  }
`;

export const Input = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;

  &:checked + ${Mark} {
    &::after {
      width: 33px;
      height: 33px;
      opacity: 1;
      left: 9%;
      top: 8%;
    }
  }
`;

export const Label = styled.label`
  display: flex;
  cursor: pointer;
  padding: 5px 10px 5px 0;
  position: relative;
`;
