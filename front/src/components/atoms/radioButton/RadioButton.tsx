import React, { memo } from 'react';
import { StyledRadioButton, RadioButtonProps } from './RadioButton.style';

const RadioButton = ({
  children,
  flex = 'auto',
  outline = 'black',
  bgColor = 'black',
  size = 'small',
  className,
  onClick,
}: RadioButtonProps) => {
  const classCandidate = [size, className];
  const commonProps = {
    flex,
    size,
    outline,
    bgColor,
  };

  const RealRadioButton = (
    <StyledRadioButton {...commonProps} className={classCandidate} onClick={onClick}>
      {children}
    </StyledRadioButton>
  );

  return RealRadioButton;
};

export default memo(RadioButton);
