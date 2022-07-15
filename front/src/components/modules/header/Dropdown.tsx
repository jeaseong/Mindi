import React, { useState, useEffect } from 'react';
import { DropdownProps } from 'types/atoms';
import { Container } from './Dropdown.style';

function Dropdown({ children, visible, onClick }: DropdownProps) {
  const [visibilityAnimation, setVisibilityAnimation] = useState(false);

  useEffect(() => {
    if (visible) {
      setVisibilityAnimation(true);
    } else {
      setTimeout(() => {
        setVisibilityAnimation(false);
      }, 300);
    }
  }, [visible]);
  return (
    <Container
      onClick={onClick}
      visibilityAnimation={visibilityAnimation}
      visible={visible}
    >
      {children}
    </Container>
  );
}

export default Dropdown;
