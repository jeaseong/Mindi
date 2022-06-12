import React, { memo } from 'react';
import { StyledRadioButton, RadioButtonProps } from './RadioButton.style';
import cn from 'classnames';

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
    <StyledRadioButton {...commonProps} className={cn(classCandidate)} onClick={onClick}>
      {children}
    </StyledRadioButton>
  );

  return RealRadioButton;
};

export default memo(RadioButton);
